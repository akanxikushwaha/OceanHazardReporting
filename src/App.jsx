import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import UserDashboard from './pages/userDashboard/UserDashboard';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import { supabase } from './pages/homePage/signUp/supabaseClient';
import ProtectedRoute from './pages/homePage/signUp/ProtectedRoute';

function App() {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // ---------------- Fetch user role ----------------
  const fetchUserRole = async (userId, isMounted = true) => {
    console.log("🔍 Fetching role for userId:", userId);

    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

      if (!isMounted) return;

      if (error) {
        console.error("❌ Error fetching role:", error);
        setRole(null);
      } else if (data) {
        console.log("✅ Role found:", data.role);
        setRole(data.role);
      } else {
        console.warn("⚠️ No role found for user:", userId);
        setRole(null);
      }
    } catch (err) {
      console.error("🔥 Exception while fetching role:", err);
      if (isMounted) setRole(null);
    } finally {
      if (isMounted) {
        console.log("🏁 fetchUserRole finished");
        setLoading(false);
      }
    }
  };

  // ---------------- Session + listener ----------------
  useEffect(() => {
    let isMounted = true;

    const getSessionAndRole = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) console.error("❌ Error getting session:", error);

        if (!isMounted) return;
        setSession(session);

        if (session?.user) {
          await fetchUserRole(session.user.id, isMounted);
        } else {
          if (isMounted) {
            setRole(null);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error("🔥 Exception in getSessionAndRole:", err);
        if (isMounted) setLoading(false);
      }
    };

    getSessionAndRole();

    // ✅ Correct subscription cleanup
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!isMounted) return;

        setSession(session);

        if (session?.user) {
          await fetchUserRole(session.user.id, isMounted);
        } else {
          setRole(null);
          setLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ---------------- Loading UI ----------------
   if (loading) return <p>Loading...</p>;

  // ---------------- Routes ----------------
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public route */}
          <Route path="/" element={<HomePage />} />

          {/* User Dashboard (protected) */}
          <Route
            path="/UserDashboard"
            element={
              <ProtectedRoute session={session} role={role} requiredRole="user">
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard (protected) */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute session={session} role={role} requiredRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;