@@ .. @@
 import React, { useState } from 'react';
-import { ChevronRight, Target, Clock, DollarSign, TrendingUp } from 'lucide-react';
-import { UserProfile } from '../App';
+import { ChevronRight, Target, Clock, DollarSign, TrendingUp, User, Briefcase, Heart } from 'lucide-react';
+import { useUserProfile } from '../hooks/useUserProfile';

 interface OnboardingFlowProps {
-  onComplete: (profile: UserProfile) => void;
+  onComplete: () => void;
 }

 export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
-  const [step, setStep] = useState(1);
+  const { createProfile } = useUserProfile();
+  const [step, setStep] = useState(1);
+  const [loading, setLoading] = useState(false);
+  const [error, setError] = useState<string | null>(null);
   const [formData, setFormData] = useState({
     name: '',
     age: 30,
-    retirementAge: 65,
-    currentSuper: 50000,
-    monthlyContribution: 500,
+    retirement_age: 65,
+    annual_income: 75000,
+    total_savings: 25000,
+    current_super: 50000,
+    monthly_contribution: 500,
+    employer_contribution: 300,
     riskTolerance: 'balanced' as const,
-    financialGoals: [] as string[],
+    investment_experience: 'intermediate' as const,
+    employment_status: 'Full-time',
+    relationship_status: 'Single',
+    dependents: 0,
+    financial_goals: [] as string[],
+    preferred_sectors: [] as string[],
+    esg_preferences: false,
+    tax_considerations: [] as string[],
   });

   const goalOptions = [
@@ .. @@
     'Travel and lifestyle goals'
   ];

+  const sectorOptions = [
+    'Technology',
+    'Healthcare',
+    'Financial Services',
+    'Resources & Mining',
+    'Consumer Goods',
+    'Real Estate',
+    'Infrastructure',
+    'Renewable Energy'
+  ];
+
+  const taxOptions = [
+    'Salary sacrifice contributions',
+    'Government co-contributions',
+    'Spouse contributions',
+    'Tax-effective investments',
+    'Franking credits optimization'
+  ];
+
   const riskOptions = [
     { value: 'conservative', label: 'Conservative', desc: 'Steady growth, lower risk' },
     { value: 'balanced', label: 'Balanced', desc: 'Mix of growth and stability' },
-    { value: 'growth', label: 'Growth', desc: 'Higher potential returns' },
+    { value: 'growth', label: 'Growth', desc: 'Higher potential returns' },
     { value: 'aggressive', label: 'Aggressive', desc: 'Maximum growth potential' },
   ];

-  const handleNext = () => {
-    if (step < 4) {
+  const experienceOptions = [
+    { value: 'beginner', label: 'Beginner', desc: 'New to investing' },
+    { value: 'intermediate', label: 'Intermediate', desc: 'Some investment experience' },
+    { value: 'advanced', label: 'Advanced', desc: 'Experienced investor' },
+  ];
+
+  const handleNext = async () => {
+    if (step < 6) {
       setStep(step + 1);
     } else {
-      onComplete({
-        ...formData,
-        completed: true
-      });
+      await handleSubmit();
     }
   };

+  const handleSubmit = async () => {
+    setLoading(true);
+    setError(null);
+
+    try {
+      const profileData = {
+        name: formData.name,
+        age: formData.age,
+        retirement_age: formData.retirement_age,
+        annual_income: formData.annual_income,
+        total_savings: formData.total_savings,
+        current_super: formData.current_super,
+        monthly_contribution: formData.monthly_contribution,
+        employer_contribution: formData.employer_contribution,
+        risk_tolerance: formData.riskTolerance,
+        investment_experience: formData.investment_experience,
+        employment_status: formData.employment_status,
+        relationship_status: formData.relationship_status,
+        dependents: formData.dependents,
+        financial_goals: formData.financial_goals,
+        preferred_sectors: formData.preferred_sectors,
+        esg_preferences: formData.esg_preferences,
+        tax_considerations: formData.tax_considerations,
+      };
+
+      const { error } = await createProfile(profileData);
+      
+      if (error) {
+        setError(error);
+      } else {
+        onComplete();
+      }
+    } catch (err: any) {
+      setError(err.message || 'An error occurred while creating your profile');
+    } finally {
+      setLoading(false);
+    }
+  };
+
   const handleGoalToggle = (goal: string) => {
     setFormData(prev => ({
       ...prev,
-      financialGoals: prev.financialGoals.includes(goal)
-        ? prev.financialGoals.filter(g => g !== goal)
-        : [...prev.financialGoals, goal]
+      financial_goals: prev.financial_goals.includes(goal)
+        ? prev.financial_goals.filter(g => g !== goal)
+        : [...prev.financial_goals, goal]
+    }));
+  };
+
+  const handleSectorToggle = (sector: string) => {
+    setFormData(prev => ({
+      ...prev,
+      preferred_sectors: prev.preferred_sectors.includes(sector)
+        ? prev.preferred_sectors.filter(s => s !== sector)
+        : [...prev.preferred_sectors, sector]
+    }));
+  };
+
+  const handleTaxToggle = (tax: string) => {
+    setFormData(prev => ({
+      ...prev,
+      tax_considerations: prev.tax_considerations.includes(tax)
+        ? prev.tax_considerations.filter(t => t !== tax)
+        : [...prev.tax_considerations, tax]
     }));
   };

@@ .. @@
         return (
           <div className="space-y-6">
             <div className="text-center">
-              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
+              <User className="w-12 h-12 text-blue-600 mx-auto mb-4" />
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Let's get to know you</h2>
               <p className="text-slate-600">Tell us about yourself to personalize your investment advice</p>
             </div>
             
-            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+            <div className="space-y-6">
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                 <input
@@ .. @@
                   placeholder="Enter your name"
                 />
               </div>
-              
-              <div>
-                <label className="block text-sm font-medium text-slate-700 mb-2">Current Age</label>
-                <input
-                  type="number"
-                  value={formData.age}
-                  onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
-                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
-                />
-              </div>
-              
-              <div>
-                <label className="block text-sm font-medium text-slate-700 mb-2">Planned Retirement Age</label>
-                <input
-                  type="number"
-                  value={formData.retirementAge}
-                  onChange={(e) => setFormData(prev => ({ ...prev, retirementAge: parseInt(e.target.value) }))}
-                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
-                />
-              </div>
-              
-              <div>
-                <label className="block text-sm font-medium text-slate-700 mb-2">Years to Retirement</label>
-                <input
-                  type="number"
-                  value={formData.retirementAge - formData.age}
-                  disabled
-                  className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
-                />
+
+              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
+                <div>
+                  <label className="block text-sm font-medium text-slate-700 mb-2">Current Age</label>
+                  <input
+                    type="number"
+                    value={formData.age}
+                    onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
+                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  />
+                </div>
+                
+                <div>
+                  <label className="block text-sm font-medium text-slate-700 mb-2">Planned Retirement Age</label>
+                  <input
+                    type="number"
+                    value={formData.retirement_age}
+                    onChange={(e) => setFormData(prev => ({ ...prev, retirement_age: parseInt(e.target.value) }))}
+                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  />
+                </div>
+                
+                <div>
+                  <label className="block text-sm font-medium text-slate-700 mb-2">Years to Retirement</label>
+                  <input
+                    type="number"
+                    value={formData.retirement_age - formData.age}
+                    disabled
+                    className="w-full px-4 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-600"
+                  />
+                </div>
+              </div>
+
+              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+                <div>
+                  <label className="block text-sm font-medium text-slate-700 mb-2">Employment Status</label>
+                  <select
+                    value={formData.employment_status}
+                    onChange={(e) => setFormData(prev => ({ ...prev, employment_status: e.target.value }))}
+                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  >
+                    <option value="Full-time">Full-time</option>
+                    <option value="Part-time">Part-time</option>
+                    <option value="Self-employed">Self-employed</option>
+                    <option value="Unemployed">Unemployed</option>
+                    <option value="Retired">Retired</option>
+                  </select>
+                </div>
+
+                <div>
+                  <label className="block text-sm font-medium text-slate-700 mb-2">Relationship Status</label>
+                  <select
+                    value={formData.relationship_status}
+                    onChange={(e) => setFormData(prev => ({ ...prev, relationship_status: e.target.value }))}
+                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  >
+                    <option value="Single">Single</option>
+                    <option value="Married">Married</option>
+                    <option value="De facto">De facto</option>
+                    <option value="Divorced">Divorced</option>
+                    <option value="Widowed">Widowed</option>
+                  </select>
+                </div>
+              </div>
+
+              <div>
+                <label className="block text-sm font-medium text-slate-700 mb-2">Number of Dependents</label>
+                <input
+                  type="number"
+                  min="0"
+                  value={formData.dependents}
+                  onChange={(e) => setFormData(prev => ({ ...prev, dependents: parseInt(e.target.value) }))}
+                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                />
               </div>
             </div>
           </div>
@@ .. @@
         return (
           <div className="space-y-6">
             <div className="text-center">
-              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
+              <Briefcase className="w-12 h-12 text-green-600 mx-auto mb-4" />
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Financial Situation</h2>
               <p className="text-slate-600">Help us understand your current superannuation position</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
+              <div>
+                <label className="block text-sm font-medium text-slate-700 mb-2">Annual Income</label>
+                <div className="relative">
+                  <span className="absolute left-3 top-3 text-slate-500">$</span>
+                  <input
+                    type="number"
+                    value={formData.annual_income}
+                    onChange={(e) => setFormData(prev => ({ ...prev, annual_income: parseInt(e.target.value) }))}
+                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  />
+                </div>
+              </div>
+
+              <div>
+                <label className="block text-sm font-medium text-slate-700 mb-2">Total Savings (outside super)</label>
+                <div className="relative">
+                  <span className="absolute left-3 top-3 text-slate-500">$</span>
+                  <input
+                    type="number"
+                    value={formData.total_savings}
+                    onChange={(e) => setFormData(prev => ({ ...prev, total_savings: parseInt(e.target.value) }))}
+                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  />
+                </div>
+              </div>
+
               <div>
                 <label className="block text-sm font-medium text-slate-700 mb-2">Current Superannuation Balance</label>
                 <div className="relative">
                   <span className="absolute left-3 top-3 text-slate-500">$</span>
                   <input
                     type="number"
-                    value={formData.currentSuper}
-                    onChange={(e) => setFormData(prev => ({ ...prev, currentSuper: parseInt(e.target.value) }))}
+                    value={formData.current_super}
+                    onChange={(e) => setFormData(prev => ({ ...prev, current_super: parseInt(e.target.value) }))}
                     className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                 </div>
               </div>
               
               <div>
-                <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Contribution</label>
+                <label className="block text-sm font-medium text-slate-700 mb-2">Your Monthly Contribution</label>
                 <div className="relative">
                   <span className="absolute left-3 top-3 text-slate-500">$</span>
                   <input
                     type="number"
-                    value={formData.monthlyContribution}
-                    onChange={(e) => setFormData(prev => ({ ...prev, monthlyContribution: parseInt(e.target.value) }))}
+                    value={formData.monthly_contribution}
+                    onChange={(e) => setFormData(prev => ({ ...prev, monthly_contribution: parseInt(e.target.value) }))}
+                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  />
+                </div>
+              </div>
+
+              <div className="md:col-span-2">
+                <label className="block text-sm font-medium text-slate-700 mb-2">Employer Monthly Contribution</label>
+                <div className="relative">
+                  <span className="absolute left-3 top-3 text-slate-500">$</span>
+                  <input
+                    type="number"
+                    value={formData.employer_contribution}
+                    onChange={(e) => setFormData(prev => ({ ...prev, employer_contribution: parseInt(e.target.value) }))}
                     className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                   />
                 </div>
@@ .. @@
             
             <div className="bg-blue-50 p-6 rounded-lg">
               <h3 className="font-semibold text-slate-900 mb-2">Projected Retirement Balance</h3>
               <p className="text-2xl font-bold text-blue-600">
-                ${Math.round(formData.currentSuper + (formData.monthlyContribution * 12 * (formData.retirementAge - formData.age) * 1.07)).toLocaleString()}
+                ${Math.round(formData.current_super + ((formData.monthly_contribution + formData.employer_contribution) * 12 * (formData.retirement_age - formData.age) * 1.07)).toLocaleString()}
               </p>
               <p className="text-sm text-slate-600 mt-1">Based on 7% average annual return</p>
             </div>
@@ .. @@
         return (
           <div className="space-y-6">
             <div className="text-center">
-              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
+              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Risk Tolerance</h2>
               <p className="text-slate-600">Choose your investment approach based on your comfort with market volatility</p>
             </div>
@@ .. @@
           </div>
         );

       case 4:
+        return (
+          <div className="space-y-6">
+            <div className="text-center">
+              <TrendingUp className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
+              <h2 className="text-2xl font-bold text-slate-900 mb-2">Investment Experience</h2>
+              <p className="text-slate-600">Help us understand your investment knowledge and experience</p>
+            </div>
+            
+            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
+              {experienceOptions.map((option) => (
+                <button
+                  key={option.value}
+                  onClick={() => setFormData(prev => ({ ...prev, investment_experience: option.value as any }))}
+                  className={`p-6 rounded-lg border-2 text-left transition-all duration-200 ${
+                    formData.investment_experience === option.value
+                      ? 'border-indigo-500 bg-indigo-50'
+                      : 'border-slate-200 hover:border-slate-300'
+                  }`}
+                >
+                  <h3 className="font-semibold text-slate-900 mb-2">{option.label}</h3>
+                  <p className="text-slate-600">{option.desc}</p>
+                </button>
+              ))}
+            </div>
+          </div>
+        );
+
+      case 5:
         return (
           <div className="space-y-6">
             <div className="text-center">
@@ .. @@
               {goalOptions.map((goal) => (
                 <button
                   key={goal}
                   onClick={() => handleGoalToggle(goal)}
                   className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
-                    formData.financialGoals.includes(goal)
+                    formData.financial_goals.includes(goal)
                       ? 'border-orange-500 bg-orange-50'
                       : 'border-slate-200 hover:border-slate-300'
                   }`}
@@ .. @@
             </div>
           </div>
         );
+
+      case 6:
+        return (
+          <div className="space-y-6">
+            <div className="text-center">
+              <Heart className="w-12 h-12 text-pink-600 mx-auto mb-4" />
+              <h2 className="text-2xl font-bold text-slate-900 mb-2">Investment Preferences</h2>
+              <p className="text-slate-600">Tell us about your sector preferences and values</p>
+            </div>
+            
+            <div>
+              <h3 className="font-semibold text-slate-900 mb-4">Preferred Investment Sectors</h3>
+              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
+                {sectorOptions.map((sector) => (
+                  <button
+                    key={sector}
+                    onClick={() => handleSectorToggle(sector)}
+                    className={`p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
+                      formData.preferred_sectors.includes(sector)
+                        ? 'border-pink-500 bg-pink-50 text-pink-700'
+                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
+                    }`}
+                  >
+                    {sector}
+                  </button>
+                ))}
+              </div>
+            </div>

+            <div>
+              <label className="flex items-center space-x-3">
+                <input
+                  type="checkbox"
+                  checked={formData.esg_preferences}
+                  onChange={(e) => setFormData(prev => ({ ...prev, esg_preferences: e.target.checked }))}
+                  className="w-5 h-5 text-pink-600 border-slate-300 rounded focus:ring-pink-500"
+                />
+                <div>
+                  <span className="font-medium text-slate-900">ESG (Environmental, Social, Governance) Investing</span>
+                  <p className="text-sm text-slate-600">Prefer investments that align with sustainable and ethical practices</p>
+                </div>
+              </label>
+            </div>

+            <div>
+              <h3 className="font-semibold text-slate-900 mb-4">Tax Considerations</h3>
+              <div className="space-y-3">
+                {taxOptions.map((tax) => (
+                  <button
+                    key={tax}
+                    onClick={() => handleTaxToggle(tax)}
+                    className={`w-full p-3 rounded-lg border-2 text-left text-sm transition-all duration-200 ${
+                      formData.tax_considerations.includes(tax)
+                        ? 'border-pink-500 bg-pink-50 text-pink-700'
+                        : 'border-slate-200 hover:border-slate-300 text-slate-700'
+                    }`}
+                  >
+                    {tax}
+                  </button>
+                ))}
+              </div>
+            </div>
+          </div>
+        );
     }
   };

@@ .. @@
       <div className="max-w-4xl mx-auto">
         <div className="mb-8">
           <div className="flex items-center justify-between mb-4">
-            <span className="text-sm font-medium text-slate-600">Step {step} of 4</span>
-            <span className="text-sm font-medium text-slate-600">{Math.round((step / 4) * 100)}% Complete</span>
+            <span className="text-sm font-medium text-slate-600">Step {step} of 6</span>
+            <span className="text-sm font-medium text-slate-600">{Math.round((step / 6) * 100)}% Complete</span>
           </div>
           <div className="w-full bg-slate-200 rounded-full h-2">
             <div 
               className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
-              style={{ width: `${(step / 4) * 100}%` }}
+              style={{ width: `${(step / 6) * 100}%` }}
             />
           </div>
         </div>

         <div className="bg-white rounded-xl shadow-lg p-8">
+          {error && (
+            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
+              <p className="text-red-700 text-sm">{error}</p>
+            </div>
+          )}
+
           {renderStep()}
           
           <div className="flex justify-between mt-8">
@@ .. @@
            
            <button
              onClick={handleNext}
-             disabled={step === 1 && !formData.name}
+             disabled={(step === 1 && !formData.name) || loading}
              className="ml-auto flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
            >
-             <span>{step === 4 ? 'Complete Setup' : 'Next'}</span>
+             <span>{loading ? 'Creating Profile...' : step === 6 ? 'Complete Setup' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
           </div>
@@ .. @@