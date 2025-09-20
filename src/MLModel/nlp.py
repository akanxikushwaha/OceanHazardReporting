import re
import html
import logging
import joblib
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline
from textblob import TextBlob

try:
    from langdetect import detect
except:
    def detect(x):
        return "unknown"

from supabase import create_client, Client

# -------------------------
# For location extraction
# -------------------------
import spacy
try:
    nlp = spacy.load("en_core_web_sm")  # English NER
except:
    import spacy.cli
    spacy.cli.download("en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

# -------------------------
# Supabase Config
# -------------------------
SUPABASE_URL = "https://fqjoohzcvsvlfmjcucmq.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxam9vaHpjdnN2bGZtamN1Y21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgzMTEzODIsImV4cCI6MjA3Mzg4NzM4Mn0.BjnGZLiXBRBTSO7uYFxsE4mqA5G_l_WVN5g1vsvMvvw"
TABLE_NAME = "twitterdata"

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# -------------------------
# Logging
# -------------------------
logging.basicConfig(format='%(asctime)s - %(message)s',
                    level=logging.ERROR,
                    handlers=[logging.StreamHandler()])

# -------------------------
# Load Models
# -------------------------
embed_model = SentenceTransformer("sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
classifier = pipeline("zero-shot-classification", model="joeddav/xlm-roberta-large-xnli")
literal_clf = joblib.load(r"C:\Users\aagra\Desktop\New folder\literal_figurative_clf.pkl")

# -------------------------
# Hazard keywords / concepts
# -------------------------
hazard_concepts = [
    # English
    "There is a tsunami warning",
    "Storm surge expected on the coast",
    "Dangerous rip currents reported",
    "High tide flooding near beaches",
    "Waves are extremely rough",

    # Spanish
    "Alerta de tsunami en la costa",
    "Marejada ciclónica en camino",
    "Corrientes peligrosas en la playa",

    # Tagalog
    "May babala ng tsunami",
    "Malakas ang alon sa tabing-dagat",
    "Mapanganib ang mga alon ngayon",

    # Hindi
    "सुनामी की चेतावनी जारी की गई है",
    "तट पर तेज लहरें आ रही हैं",
    "समुद्र बहुत उग्र है",

    # French
    "Alerte de vague géante",
    "Inondation côtière imminente",
    "Mer très agitée",

    # Japanese
    "津波警報が発令されました",
    "海がとても荒れています",

    # Portuguese
    "Alerta de correnteza no mar",
    "Ondas perigosas estão chegando"
]
hazard_embeddings = embed_model.encode(hazard_concepts, convert_to_tensor=True)

ocean_hazard_keywords = [
    # General
    "ocean hazard", "marine hazard", "coastal hazard", "sea hazard",
    "abnormal sea", "abnormal ocean", "abnormal tide", "dangerous sea", "rough sea",
    # Tsunami
    "tsunami", "tidal wave", "seismic sea wave", "submarine earthquake",
    "tsunami alert", "tsunami warning", "tsunami surge", "tsunami waves",
    "undersea quake", "tsunami advisory", "wave run-up", "tsunami evacuation",
    # Storm surge
    "storm surge", "hurricane surge", "cyclone surge", "typhoon surge", "surge flood",
    "wind-driven surge", "surge tide", "storm tide", "surge inundation",
    # Coastal flooding
    "coastal flooding", "coastal inundation", "coastal submersion", "flooded coast",
    "high tide flood", "marine flooding", "ocean flooding", "seawater intrusion",
    # Waves & swells
    "high waves", "rogue wave", "monster wave", "ocean swell", "sea swell",
    "swelling sea", "dangerous waves", "huge waves", "wave inundation",
    "long-period swell", "storm waves", "wave runup", "breaking waves", "swell surge",
    # Currents
    "coastal current", "rip current", "rip tide", "undertow", "longshore current",
    "dangerous current", "fast-moving current", "marine current", "backwash",
    "cross current", "nearshore current", "beach current", "offshore pull",
    # Tides
    "king tide", "strong tide", "spring tide", "tidal bore", "rising tide",
    "falling tide", "tidal anomaly", "extreme tide", "abnormal tide",
    # Erosion & marine impact
    "coastal erosion", "shoreline erosion", "beach erosion", "dune erosion",
    "seawall overtopping", "pier damage", "breakwater breach",
    # Sea level rise
    "sea level rise", "rising sea", "climate-induced flooding", "marine transgression",
    # Other marine dangers
    "floating debris", "marine debris", "navigation hazard", "maritime hazard",
    "submarine landslide", "seafloor uplift", "coastal collapse", "land subsidence",
    "wave reflection", "wave resonance", "harbor resonance", "harbor oscillation",
    # Warnings & alerts
    "marine warning", "ocean alert", "coastal alert", "beach hazard statement",
    "rip current warning", "tsunami watch", "storm surge watch", "high surf advisory",
    "coastal flood advisory", "surf warning", "maritime safety warning",
    # Human impact phrases
    "beach closed", "swimming prohibited", "evacuation order", "life-threatening waves",
    "drowning risk", "hazardous beach conditions", "boats damaged", "ports closed",
    # Informal/common
    "crazy waves", "killer wave", "ocean acting weird", "sea looks angry", "strange tide",
    "waves pulling people", "water rushing in", "freak wave", "unusual sea", "weird ocean activity"
]

# -------------------------
# Severity templates
# -------------------------
severity_templates = {
    "High severity ocean hazard": [
        "Tsunami caused widespread coastal destruction",
        "Storm surge flooded entire coastal towns",
        "Abnormally high waves damaged infrastructure and caused fatalities"
    ],
    "Medium severity ocean hazard": [
        "Storm surge expected to cause moderate flooding",
        "Tsunami warning issued after offshore earthquake",
        "Strong rip currents along beaches with injury reports"
    ],
    "Low severity ocean hazard": [
        "High tide and coastal current advisory issued",
        "Waves expected to be higher than usual, swimming not advised",
        "Minor coastal flooding expected due to sea level anomaly"
    ]
}
template_embeddings = {sev: embed_model.encode(sents, convert_to_tensor=True)
                       for sev, sents in severity_templates.items()}

# -------------------------
# Cleaner
# -------------------------
URL_PATTERN = re.compile(r"https?://\S+")
NEGATION_WORDS = ["no", "not", "without", "sin", "kein", "无", "不要", "pas", "aucun"]
hazard_pattern = r"|".join([re.escape(k) for k in ocean_hazard_keywords])
negation_pattern = r"\b(" + r"|".join(NEGATION_WORDS) + r")\s+(" + hazard_pattern + r")\b"
NEGATION_PATTERNS = re.compile(negation_pattern, flags=re.IGNORECASE)

def clean_text_better(text):
    text = html.unescape(text)
    text = re.sub(r"^RT\s+@[\w_]+:\s*", "", text, flags=re.IGNORECASE)
    urls = URL_PATTERN.findall(text)
    text = URL_PATTERN.sub(" ", text)
    mentions = re.findall(r"@\w+", text)
    text = re.sub(r"@\w+", " ", text)
    text = re.sub(r"(?!#)[^\w\s']", " ", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text.lower(), {"has_url": bool(urls), "mentions": len(mentions)}

# -------------------------
# Hazard + Literal/figurative check
# -------------------------
def is_ocean_hazard_with_ml(text, sem_threshold=0.35):
    text_clean, meta = clean_text_better(text)
    if NEGATION_PATTERNS.search(text_clean):
        return False, {"reason": "negation_detected", "meta": meta}

    keyword_match = any(re.search(r"\b" + re.escape(kw) + r"\b", text_clean) for kw in ocean_hazard_keywords)
    text_emb_np = embed_model.encode([text_clean], convert_to_numpy=True)
    sem_sim = util.cos_sim(text_emb_np, hazard_embeddings).max().item()
    sem_match = sem_sim >= sem_threshold

    if not (keyword_match or sem_match):
        return False, {"reason": "no_keyword_or_semantic_match", "semantic_sim": round(sem_sim, 2), "meta": meta}

    if literal_clf is None:
        return True, {"reason": "Literal check skipped", "meta": meta}

    pca_object = literal_clf['pca']
    model_object = literal_clf['model']
    text_emb_transformed = pca_object.transform(text_emb_np)
    literal_prob = model_object.predict_proba(text_emb_transformed)[0][1]

    if literal_prob < 0.5:
        return False, {"reason": "figurative_detected", "literal_prob": round(literal_prob, 2), "meta": meta}

    success_meta = {
        "reason": "literal_hazard",
        "keyword_match": keyword_match,
        "semantic_sim": round(sem_sim, 2),
        "literal_prob": round(literal_prob, 2),
        "meta": meta
    }
    return True, success_meta

# -------------------------
# Severity classifier
# -------------------------
def classify_severity_pipeline(texts, zero_shot_threshold=0.55, sim_threshold=0.4, explain=False):
    candidate_labels = ["Low severity ocean hazard","Medium severity ocean hazard","High severity ocean hazard"]
    results = []
    for text in texts:
        is_hazard, reason_meta = is_ocean_hazard_with_ml(text, sem_threshold=sim_threshold)
        if not is_hazard:
            if explain:
                results.append((text, "Not an ocean hazard", 0.0, reason_meta))
            else:
                results.append((text, "Not an ocean hazard", 0.0))
            continue

        zs = classifier(text, candidate_labels)
        best_label = zs["labels"][0]
        best_score = zs["scores"][0]

        severity_label, severity_score, method = "Unclassified", 0.0, None
        if best_score >= zero_shot_threshold:
            severity_label = best_label
            severity_score = round(best_score * 100,2)
            method = "Zero-Shot"
        else:
            text_emb = embed_model.encode(text, convert_to_tensor=True)
            best_sim, best_sim_label = -1, None
            for sev, emb in template_embeddings.items():
                sim = util.cos_sim(text_emb, emb).max().item()
                if sim > best_sim:
                    best_sim = sim
                    best_sim_label = sev
            if best_sim >= sim_threshold:
                severity_label = best_sim_label
                severity_score = round(best_sim*100,2)
                method = "Semantic Similarity"
            else:
                lang = detect(text)
                if lang == "en":
                    polarity = TextBlob(text).sentiment.polarity
                    severity_label = "Unclassified"
                    severity_score = round(abs(polarity)*10,2)
                    method = "Sentiment Fallback (English)"
                else:
                    severity_label = "Unclassified"
                    severity_score = 5.0
                    method = f"Sentiment Fallback (lang={lang})"

        if explain:
            results.append((text, severity_label, severity_score, method, reason_meta))
        else:
            results.append((text, severity_label, severity_score))
    return results

# -------------------------
# Location extraction
# -------------------------
def extract_location(text):
    doc = nlp(text)
    locations = [ent.text for ent in doc.ents if ent.label_ in ["GPE","LOC"]]
    return ", ".join(locations) if locations else None

# -------------------------
# Fetch Data from Supabase
# -------------------------
def fetch_twitter_data():
    response = supabase.table(TABLE_NAME).select("*").execute()
    data = response.data
    df = pd.DataFrame(data)
    for col in ["replies","retweets","likes"]:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce').fillna(0)
    if "created_at" in df.columns:
        df["created_at"] = pd.to_datetime(df["created_at"], errors='coerce')
    return df

# -------------------------
# Graphs (same as previous)
# -------------------------
def plot_graphs(df, severity_scores=None):
    # 1) Likes vs Retweets
    plt.figure(figsize=(8,6))
    plt.scatter(df["retweets"], df["likes"], alpha=0.6)
    plt.xlabel("Retweets")
    plt.ylabel("Likes")
    plt.title("Likes vs Retweets")
    plt.grid(True)
    plt.show()
    # 2) Replies histogram
    plt.figure(figsize=(8,5))
    plt.hist(df["replies"], bins=30)
    plt.xlabel("Replies")
    plt.ylabel("Number of Tweets")
    plt.title("Replies Distribution")
    plt.show()
    # 3) Top tweets by engagement
    df["engagement"] = df["likes"] + df["retweets"] + df["replies"]
    top = df.sort_values("engagement", ascending=False).head(10)
    plt.figure(figsize=(10,6))
    plt.barh(top["text"].str.slice(0,60), top["engagement"])
    plt.xlabel("Engagement")
    plt.title("Top 10 Tweets by Engagement")
    plt.gca().invert_yaxis()
    plt.show()
    # 4) Tweets over time
    ts = df.set_index("created_at").sort_index()
    if not ts.empty:
        ts_daily = ts["text"].resample("D").count().asfreq("D", fill_value=0)
        plt.figure(figsize=(10,5))
        plt.plot(ts_daily.index, ts_daily.values, marker='o')
        plt.title("Tweets Over Time")
        plt.xlabel("Date")
        plt.ylabel("Number of Tweets")
        plt.xticks(rotation=30)
        plt.grid(True)
        plt.show()
    else:
        print("No timestamp data available to plot tweets over time.")
    # 5) Severity distribution
    if severity_scores:
        plt.figure(figsize=(7,5))
        plt.hist(severity_scores, bins=[0,25,50,75,100])
        plt.xlabel("Severity Score")
        plt.ylabel("Number of Tweets")
        plt.title("Severity Distribution")
        plt.show()

# -------------------------
# Main
# -------------------------
if __name__ == "__main__":
    df = fetch_twitter_data()
    print("Fetched", len(df), "rows from Supabase")

    # Initialize new columns
    df["severity"] = "Not an ocean hazard"
    df["severity_score"] = 0.0
    df["isverified"] = 0
    df["location"] = None

    texts = df["text"].fillna("").tolist()
    results = classify_severity_pipeline(texts, explain=True)

    for idx, r in enumerate(results):
        text, severity_label, severity_score, method, reason_meta = r
        df.at[idx, "severity"] = severity_label
        df.at[idx, "severity_score"] = float(severity_score)
        if severity_label != "Not an ocean hazard":
            df.at[idx, "isverified"] = 1
        # Extract location
        df.at[idx, "location"] = extract_location(text)

    # Update Supabase table
    for idx, row in df.iterrows():
        supabase.table(TABLE_NAME).update({
            "severity": row["severity"],
            "severity_score": float(row["severity_score"]),
            "isverified": int(row["isverified"]),
            "location": row["location"]
        }).eq("text", row["text"]).execute()

    # Extract severity scores for graph
    severity_scores = df[df["isverified"] == 1]["severity_score"].tolist()
    plot_graphs(df, severity_scores)