
import React, { useState } from 'react';
import { Header } from './components/Header';
import { ChatInterface } from './components/ChatInterface';
import { Dashboard } from './components/Dashboard';
import { OnboardingFlow } from './components/OnboardingFlow';
import { EducationCenter } from './components/EducationCenter';
import { LandingPage } from './components/LandingPage';

export type UserProfile = {
  name: string;
  age: number;
  retirementAge: number;
  currentSuper: number;
  monthlyContribution: number;
  riskTolerance: 'conservative' | 'balanced' | 'growth' | 'aggressive';
  financialGoals: string[];
  completed: boolean;
};


type View = 'landing' | 'onboarding' | 'dashboard' | 'chat' | 'education';

function App() {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleGetStarted = () => {
    setCurrentView('onboarding');
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setCurrentView('dashboard');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      case 'onboarding':
        return <OnboardingFlow onComplete={handleOnboardingComplete} />;
      case 'dashboard':
        return <Dashboard userProfile={userProfile} />;
      case 'chat':
        return <ChatInterface userProfile={userProfile} />;
      case 'education':
        return <EducationCenter />;
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {currentView !== 'landing' && (
        <Header 
          currentView={currentView as Exclude<View, 'landing'>} 
          setCurrentView={setCurrentView as any}
          userProfile={userProfile}
        />
      )}
      <main className={currentView !== 'landing' ? 'pt-16' : ''}>
        {renderCurrentView()}
      </main>
    </div>
  );
}

export default App;