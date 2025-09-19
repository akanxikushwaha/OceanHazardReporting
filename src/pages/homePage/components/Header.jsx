import React, { useState } from 'react';
import { Waves, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../signUp/supabaseClient';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: "http://localhost:5173", // after email verification redirect
        data: {
        display_name: displayName,  // 👈 will show up in "Display Name"
      },
      },
    });
    if (error) setMessage(error.message);
    else setMessage("✅ Check your email for verification link.");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(`✅ Welcome back, ${data.user.email}`);
      console.log(data.user.id);

      // 👇 Fetch role from profiles table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select()
        .eq("id", data.user.id);

      if (profileError) {
        // console.log("nahi hua fetch");
        console.error(profileError);
        setMessage("Error fetching user role.");
        return;
      }
      console.log(profile[0].role);

      // 👇 Navigate based on role
      if (profile[0].role === "admin") {
        navigate("/AdminDashboard");
      } else {
        navigate("/UserDashboard");
      }
    }
  };


  return (
    <>
      <header className="bg-white/95 backdrop-blur-sm border-b border-ocean-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-2">
                <Waves className="h-8 w-8 text-ocean-600" />
                <span className="text-2xl font-bold text-ocean-800">OceanGuard</span>
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-ocean-600 hover:text-ocean-800 font-medium transition-colors">
                Home
              </Link>
              <a href="#features" className="text-ocean-600 hover:text-ocean-800 font-medium transition-colors">
                Features
              </a>
              <a href="#alerts" className="text-ocean-600 hover:text-ocean-800 font-medium transition-colors">
                Alerts
              </a>
              <a href="#news" className="text-ocean-600 hover:text-ocean-800 font-medium transition-colors">
                News
              </a>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => setShowLogin(true)}
                className="flex items-center space-x-1 text-ocean-600 hover:text-ocean-800 font-medium transition-colors">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
              <button 
                onClick={() => setShowSignUp(true)}
                className="bg-ocean-600 text-white px-4 py-2 rounded-lg hover:bg-ocean-800 transition-colors flex items-center space-x-1">
                <UserPlus className="h-4 w-4" />
                <span>Sign Up</span>
              </button>
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-ocean-100">
            <div className="px-4 py-2 space-y-2">
              <Link to="/" className="block py-2 text-ocean-600 hover:text-ocean-800">Home</Link>
              <a href="#features" className="block py-2 text-ocean-600 hover:text-ocean-800">Features</a>
              <a href="#alerts" className="block py-2 text-ocean-600 hover:text-ocean-800">Alerts</a>
              <a href="#news" className="block py-2 text-ocean-600 hover:text-ocean-800">News</a>
              <div className="pt-2 border-t border-ocean-100">
                <button 
                  onClick={() => setShowLogin(true)}
                  className="w-full text-left py-2 text-ocean-600 hover:text-ocean-800">
                  Sign In
                </button>
                <button 
                  onClick={() => setShowSignUp(true)}
                  className="w-full bg-ocean-600 text-white py-2 rounded-lg hover:bg-ocean-800 transition-colors mt-2">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-ocean-800">Sign In</h2>
              <button onClick={() => setShowLogin(false)}>
                <X className="h-6 w-6 text-ocean-600" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Email</label>
                <input 
                  type="email" 
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Password</label>
                <input 
                  type="password" 
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type="button" 
                className="w-full bg-ocean-600 text-white py-2 rounded-lg hover:bg-ocean-800 transition-colors block text-center"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <p className="text-center text-sm" style={{ color: '#cf3746ff' }}>{message}</p>
            </form>
          </div>
        </div>
      )}

      {/* SignUp Modal */}
      {showSignUp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-ocean-800">Sign Up</h2>
              <button onClick={() => setShowSignUp(false)}>
                <X className="h-6 w-6 text-ocean-600" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#313D5A' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  value={displayName}
                  placeholder="Enter Full Name"
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  style={{ borderColor: '#CBC5EA' }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-ocean-600 mb-1">Password</label>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-ocean-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-ocean-400"
                  placeholder="Enter your password"
                />
              </div>
              <button 
                type="button"
                className="w-full bg-ocean-600 text-white py-2 rounded-lg hover:bg-ocean-800 transition-colors block text-center"
                onClick={handleSignUp}
              >
                Sign Up
              </button>
              <p className="text-center text-sm" style={{ color: '#cf3746ff' }}>{message}</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;