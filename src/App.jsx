import React, { useState, useEffect, useCallback } from 'react';
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

  const clearAuthState = useCallback(() => {
    setSession(null);
    setRole(null);
    setLoading(false);
  }, []);

  // ---------------- Fetch user role ----------------
  const fetchUserRole = useCallback(async (userId) => {
    if (!userId) {
      setRole(null);
      setLoading(false);
      return;
    }

    console.log('🔍 Fetching role for userId:', userId);

    try {
      const roleRequest = supabase
        .from('profiles')
        .select('role')
        .eq('id', userId)
        .maybeSingle();

      const { data, error } = await Promise.race([
        roleRequest,
        new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Profile lookup timed out')), 10000);
        }),
      ]);

      if (error) {
        console.error('❌ Error fetching role:', error);
        setRole(null);
      } else if (data) {
        console.log('✅ Role found:', data.role);
        setRole(data.role);
      } else {
        console.warn('⚠️ No role found for user:', userId);
        setRole(null);
      }
    } catch (err) {
      console.error('🔥 Exception while fetching role:', err);
      setRole(null);
    } finally {
      console.log('🏁 fetchUserRole finished');
      setLoading(false);
    }
  }, []);

  // ---------------- Session + listener ----------------
  useEffect(() => {
  let isMounted = true;

  const initializeAuth = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!isMounted) return;

      if (error) {
        console.error("❌ Error getting session:", error);
        clearAuthState();
        return;
      }

      if (!session?.user) {
        clearAuthState();
        return;
      }

      console.log("✅ Initial session found:", session.user.id);

      setSession(session);

      await fetchUserRole(session.user.id);

    } catch (err) {
      console.error("🔥 Exception initializing auth:", err);

      if (isMounted) {
        clearAuthState();
      }
    }
  };

  initializeAuth();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, nextSession) => {
    if (!isMounted) return;

    console.log("🔐 Auth event:", event);

    if (!nextSession?.user) {
      clearAuthState();
      return;
    }

    setSession(nextSession);

    // Don't await the Supabase query inside onAuthStateChange
    setTimeout(() => {
      if (isMounted) {
        fetchUserRole(nextSession.user.id);
      }
    }, 0);
  });

  return () => {
    isMounted = false;
    subscription.unsubscribe();
  };
}, [clearAuthState, fetchUserRole]);

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
              <ProtectedRoute loading={loading} session={session} role={role} requiredRole="user">
                <UserDashboard userId={session?.user?.id} session={session} />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard (protected) */}
          <Route
            path="/AdminDashboard"
            element={
              <ProtectedRoute loading={loading} session={session} role={role} requiredRole="admin">
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