@@ .. @@
 import React, { useState } from 'react';
+import { useAuth } from './hooks/useAuth';
+import { useUserProfile } from './hooks/useUserProfile';
 import { Header } from './components/Header';
 import { ChatInterface } from './components/ChatInterface';
 import { Dashboard } from './components/Dashboard';
 import { OnboardingFlow } from './components/OnboardingFlow';
 import { EducationCenter } from './components/EducationCenter';
 import { LandingPage } from './components/LandingPage';
+import { LoginPage } from './components/Auth/LoginPage';
+import { SignupPage } from './components/Auth/SignupPage';
+import { ForgotPasswordPage } from './components/Auth/ForgotPasswordPage';
+import { PortfolioRecommendations } from './components/PortfolioRecommendations';

 export type UserProfile = {
@@ .. @@
 };


-type View = 'landing' | 'onboarding' | 'dashboard' | 'chat' | 'education';
+type View = 'landing' | 'login' | 'signup' | 'forgot-password' | 'onboarding' | 'dashboard' | 'chat' | 'education' | 'recommendations';

 function App() {
+  const { user, loading: authLoading } = useAuth();
+  const { profile, loading: profileLoading } = useUserProfile();
   const [currentView, setCurrentView] = useState<View>('landing');
-  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
+
+  // Show loading screen while checking authentication
+  if (authLoading) {
+    return (
+      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
+        <div className="text-center">
+          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
+          <p className="text-slate-600">Loading...</p>
+        </div>
+      </div>
+    );
+  }
+
+  // Redirect to onboarding if user is authenticated but has no profile
+  if (user && !profileLoading && !profile && currentView !== 'onboarding') {
+    setCurrentView('onboarding');
+  }
+
+  // Redirect to dashboard if user is authenticated and has profile
+  if (user && profile && ['landing', 'login', 'signup', 'forgot-password'].includes(currentView)) {
+    setCurrentView('dashboard');
+  }

   const handleGetStarted = () => {
-    setCurrentView('onboarding');
+    if (user) {
+      setCurrentView(profile ? 'dashboard' : 'onboarding');
+    } else {
+      setCurrentView('signup');
+    }
   };

-  const handleOnboardingComplete = (profile: UserProfile) => {
-    setUserProfile(profile);
+  const handleOnboardingComplete = () => {
     setCurrentView('dashboard');
   };

@@ .. @@
     switch (currentView) {
       case 'landing':
         return <LandingPage onGetStarted={handleGetStarted} />;
+      case 'login':
+        return (
+          <LoginPage
+            onBack={() => setCurrentView('landing')}
+            onSwitchToSignup={() => setCurrentView('signup')}
+            onForgotPassword={() => setCurrentView('forgot-password')}
+          />
+        );
+      case 'signup':
+        return (
+          <SignupPage
+            onBack={() => setCurrentView('landing')}
+            onSwitchToLogin={() => setCurrentView('login')}
+          />
+        );
+      case 'forgot-password':
+        return (
+          <ForgotPasswordPage
+            onBack={() => setCurrentView('login')}
+            onSwitchToLogin={() => setCurrentView('login')}
+          />
+        );
       case 'onboarding':
         return <OnboardingFlow onComplete={handleOnboardingComplete} />;
       case 'dashboard':
-        return <Dashboard userProfile={userProfile} />;
+        return <Dashboard userProfile={profile} />;
       case 'chat':
-        return <ChatInterface userProfile={userProfile} />;
+        return <ChatInterface userProfile={profile} />;
       case 'education':
         return <EducationCenter />;
+      case 'recommendations':
+        return <PortfolioRecommendations userProfile={profile} />;
       default:
         return <LandingPage onGetStarted={handleGetStarted} />;
     }
@@ .. @@

   return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
-      {currentView !== 'landing' && (
+      {!['landing', 'login', 'signup', 'forgot-password'].includes(currentView) && user && (
         <Header 
-          currentView={currentView as Exclude<View, 'landing'>} 
+          currentView={currentView as Exclude<View, 'landing' | 'login' | 'signup' | 'forgot-password'>} 
           setCurrentView={setCurrentView as any}
-          userProfile={userProfile}
+          userProfile={profile}
         />
       )}
-      <main className={currentView !== 'landing' ? 'pt-16' : ''}>
+      <main className={!['landing', 'login', 'signup', 'forgot-password'].includes(currentView) ? 'pt-16' : ''}>
         {renderCurrentView()}
       </main>
     </div>
@@ .. @@