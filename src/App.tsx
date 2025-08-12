@@ .. @@
 import React, { useState } from 'react';
 import { Header } from './components/Header';
 import { ChatInterface } from './components/ChatInterface';
 import { Dashboard } from './components/Dashboard';
 import { OnboardingFlow } from './components/OnboardingFlow';
 import { EducationCenter } from './components/EducationCenter';
+import { LandingPage } from './components/LandingPage';
+import { PortfolioRecommendations } from './components/PortfolioRecommendations';

 export type UserProfile = {
   name: string;
   age: number;
   retirementAge: number;
   currentSuper: number;
   monthlyContribution: number;
   riskTolerance: 'conservative' | 'balanced' | 'growth' | 'aggressive';
   financialGoals: string[];
+  employmentStatus: string;
+  annualIncome: number;
+  hasPartner: boolean;
   completed: boolean;
 };

 function App() {
-  const [currentView, setCurrentView] = useState<'onboarding' | 'dashboard' | 'chat' | 'education'>('onboarding');
+  const [currentView, setCurrentView] = useState<'landing' | 'onboarding' | 'dashboard' | 'chat' | 'education' | 'recommendations'>('landing');
   const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

   const handleOnboardingComplete = (profile: UserProfile) => {
     setUserProfile(profile);
     setCurrentView('dashboard');
   };

+  const handleGetStarted = () => {
+    setCurrentView('onboarding');
+  };

   const renderCurrentView = () => {
     switch (currentView) {
+      case 'landing':
+        return <LandingPage onGetStarted={handleGetStarted} />;
       case 'onboarding':
         return <OnboardingFlow onComplete={handleOnboardingComplete} />;
       case 'dashboard':
-        return <Dashboard userProfile={userProfile} />;
+        return <Dashboard userProfile={userProfile} onViewRecommendations={() => setCurrentView('recommendations')} />;
       case 'chat':
         return <ChatInterface userProfile={userProfile} />;
       case 'education':
         return <EducationCenter />;
+      case 'recommendations':
+        return <PortfolioRecommendations userProfile={userProfile} />;
       default:
-        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
+        return <LandingPage onGetStarted={handleGetStarted} />;
     }
   };

   return (
     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
-      <Header 
-        currentView={currentView} 
-        setCurrentView={setCurrentView}
-        userProfile={userProfile}
-      />
-      <main className="pt-16">
+      {currentView !== 'landing' && (
+        <Header 
+          currentView={currentView} 
+          setCurrentView={setCurrentView}
+          userProfile={userProfile}
+        />
+      )}
+      <main className={currentView !== 'landing' ? 'pt-16' : ''}>
         {renderCurrentView()}
       </main>
     </div>
   );
 }

 export default App;