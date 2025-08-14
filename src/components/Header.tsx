@@ .. @@
 import React from 'react';
-import { TrendingUp, MessageCircle, BookOpen, BarChart3 } from 'lucide-react';
-import { UserProfile } from '../App';
+import { TrendingUp, MessageCircle, BookOpen, BarChart3, Target, LogOut } from 'lucide-react';
+import { useAuth } from '../hooks/useAuth';
+import { Database } from '../lib/supabase';

+type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
+
 interface HeaderProps {
   currentView: string;
-  setCurrentView: (view: 'onboarding' | 'dashboard' | 'chat' | 'education') => void;
+  setCurrentView: (view: 'onboarding' | 'dashboard' | 'chat' | 'education' | 'recommendations') => void;
   userProfile: UserProfile | null;
 }

 export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, userProfile }) => {
+  const { signOut } = useAuth();
+
   const navItems = [
     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
     { id: 'chat', label: 'AI Advisor', icon: MessageCircle },
+    { id: 'recommendations', label: 'Recommendations', icon: Target },
     { id: 'education', label: 'Learn', icon: BookOpen },
   ];

+  const handleSignOut = async () => {
+    await signOut();
+  };
+
   return (
@@ .. @@
           {userProfile && (
-            <div className="flex items-center space-x-3">
+            <div className="flex items-center space-x-4">
               <div className="text-right">
                 <p className="text-sm font-medium text-slate-900">Welcome, {userProfile.name}</p>
-                <p className="text-xs text-slate-600">Portfolio Balance: ${userProfile.currentSuper.toLocaleString()}</p>
+                <p className="text-xs text-slate-600">Portfolio Balance: ${userProfile.current_super.toLocaleString()}</p>
               </div>
-              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
+              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center cursor-pointer">
                 <span className="text-white font-bold text-sm">{userProfile.name.charAt(0)}</span>
               </div>
+              <button
+                onClick={handleSignOut}
+                className="p-2 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
+                title="Sign Out"
+              >
+                <LogOut className="w-5 h-5" />
+              </button>
             </div>
           )}
         </div>
@@ .. @@