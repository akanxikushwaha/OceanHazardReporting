import React from 'react';
import { Shield, Users, AlertTriangle, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-ocean-600 via-ocean-800 to-ocean-800 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Protecting Our
              <span className="block text-ocean-100">Ocean Communities</span>
            </h1>
            <p className="text-xl text-ocean-100 leading-relaxed">
              Join thousands of ocean enthusiasts, researchers, and coastal communities in building the world's most comprehensive crowdsourced ocean hazard prediction platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-ocean-800 px-8 py-4 rounded-lg font-semibold hover:bg-ocean-50 transition-colors flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Report a Hazard</span>
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Users className="h-8 w-8 text-ocean-100 mx-auto mb-3" />
              <div className="text-3xl font-bold">25K+</div>
              <div className="text-ocean-100">Active Contributors</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <AlertTriangle className="h-8 w-8 text-ocean-100 mx-auto mb-3" />
              <div className="text-3xl font-bold">1.2M</div>
              <div className="text-ocean-100">Reports Submitted</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <TrendingUp className="h-8 w-8 text-ocean-100 mx-auto mb-3" />
              <div className="text-3xl font-bold">89%</div>
              <div className="text-ocean-100">Accuracy Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <Shield className="h-8 w-8 text-ocean-100 mx-auto mb-3" />
              <div className="text-3xl font-bold">156</div>
              <div className="text-ocean-100">Lives Saved</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;