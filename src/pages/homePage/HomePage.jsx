import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Statistics from './components/Statistics';
import NewsHeadlines from './components/NewsHeadlines';
import Features from './components/Features';
import Footer from './components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-ocean-50">
      <Header />
      <Hero />
      <Statistics />
      <NewsHeadlines />
      <Features />
      <Footer />
    </div>
  );
};

export default HomePage;