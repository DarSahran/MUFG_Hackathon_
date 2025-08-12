@@ .. @@
   const [formData, setFormData] = useState({
     name: '',
     age: 30,
     retirementAge: 65,
     currentSuper: 50000,
     monthlyContribution: 500,
     riskTolerance: 'balanced' as const,
     financialGoals: [] as string[],
+    employmentStatus: 'full-time',
+    annualIncome: 75000,
+    hasPartner: false,
   });

   const goalOptions = [
@@ .. @@
     { value: 'aggressive', label: 'Aggressive', desc: 'Maximum growth potential' },
   ];

+  const employmentOptions = [
+    'Full-time employed',
+    'Part-time employed', 
+    'Self-employed',
+    'Unemployed',
+    'Student',
+    'Retired'
+  ];

   const handleNext = () => {
-    if (step < 4) {
+    if (step < 5) {
       setStep(step + 1);
     } else {
       onComplete({
@@ -85,6 +98,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
         completed: true
       });
     }
   };

   const handleGoalToggle = (goal: string) => {
@@ -98,6 +112,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =

   const renderStep = () => {
     switch (step) {
       case 1:
         return (
           <div className="space-y-6">
             <div className="text-center">
@@ -147,6 +162,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
           </div>
         );

       case 2:
         return (
           <div className="space-y-6">
             <div className="text-center">
@@ -154,6 +170,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
               <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Financial Situation</h2>
               <p className="text-slate-600">Help us understand your current superannuation position</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
@@ -175,6 +192,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
                   />
                 </div>
               </div>
+              
+              <div>
+                <label className="block text-sm font-medium text-slate-700 mb-2">Annual Income</label>
+                <div className="relative">
+                  <span className="absolute left-3 top-3 text-slate-500">$</span>
+                  <input
+                    type="number"
+                    value={formData.annualIncome}
+                    onChange={(e) => setFormData(prev => ({ ...prev, annualIncome: parseInt(e.target.value) }))}
+                    className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                  />
+                </div>
+              </div>
+              
+              <div>
+                <label className="block text-sm font-medium text-slate-700 mb-2">Employment Status</label>
+                <select
+                  value={formData.employmentStatus}
+                  onChange={(e) => setFormData(prev => ({ ...prev, employmentStatus: e.target.value }))}
+                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
+                >
+                  {employmentOptions.map((option) => (
+                    <option key={option} value={option.toLowerCase().replace(' ', '-')}>
+                      {option}
+                    </option>
+                  ))}
+                </select>
+              </div>
             </div>
             
             <div className="bg-blue-50 p-6 rounded-lg">
@@ -188,6 +232,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
           </div>
         );

       case 3:
+        return (
+          <div className="space-y-6">
+            <div className="text-center">
+              <Target className="w-12 h-12 text-orange-600 mx-auto mb-4" />
+              <h2 className="text-2xl font-bold text-slate-900 mb-2">Personal Details</h2>
+              <p className="text-slate-600">A few more details to personalize your advice</p>
+            </div>
+            
+            <div className="space-y-6">
+              <div>
+                <label className="block text-sm font-medium text-slate-700 mb-4">Relationship Status</label>
+                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
+                  <button
+                    onClick={() => setFormData(prev => ({ ...prev, hasPartner: false }))}
+                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
+                      !formData.hasPartner
+                        ? 'border-blue-500 bg-blue-50'
+                        : 'border-slate-200 hover:border-slate-300'
+                    }`}
+                  >
+                    <h3 className="font-medium text-slate-900">Single</h3>
+                    <p className="text-slate-600 text-sm">Individual retirement planning</p>
+                  </button>
+                  <button
+                    onClick={() => setFormData(prev => ({ ...prev, hasPartner: true }))}
+                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
+                      formData.hasPartner
+                        ? 'border-blue-500 bg-blue-50'
+                        : 'border-slate-200 hover:border-slate-300'
+                    }`}
+                  >
+                    <h3 className="font-medium text-slate-900">Partnered</h3>
+                    <p className="text-slate-600 text-sm">Joint retirement planning considerations</p>
+                  </button>
+                </div>
+              </div>
+              
+              <div className="p-6 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
+                <h3 className="font-semibold text-slate-900 mb-3">Your Retirement Snapshot</h3>
+                <div className="grid grid-cols-2 gap-4 text-sm">
+                  <div>
+                    <span className="text-slate-600">Years to retirement:</span>
+                    <span className="font-medium text-slate-900 ml-2">{formData.retirementAge - formData.age}</span>
+                  </div>
+                  <div>
+                    <span className="text-slate-600">Current balance:</span>
+                    <span className="font-medium text-slate-900 ml-2">${formData.currentSuper.toLocaleString()}</span>
+                  </div>
+                  <div>
+                    <span className="text-slate-600">Monthly contribution:</span>
+                    <span className="font-medium text-slate-900 ml-2">${formData.monthlyContribution}</span>
+                  </div>
+                  <div>
+                    <span className="text-slate-600">Annual income:</span>
+                    <span className="font-medium text-slate-900 ml-2">${formData.annualIncome.toLocaleString()}</span>
+                  </div>
+                </div>
+              </div>
+            </div>
+          </div>
+        );
+
+      case 4:
         return (
           <div className="space-y-6">
             <div className="text-center">
@@ -210,6 +315,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
           </div>
         );

-      case 4:
+      case 5:
         return (
           <div className="space-y-6">
             <div className="text-center">
@@ -238,6 +344,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
         <div className="mb-8">
           <div className="flex items-center justify-between mb-4">
-            <span className="text-sm font-medium text-slate-600">Step {step} of 4</span>
-            <span className="text-sm font-medium text-slate-600">{Math.round((step / 4) * 100)}% Complete</span>
+            <span className="text-sm font-medium text-slate-600">Step {step} of 5</span>
+            <span className="text-sm font-medium text-slate-600">{Math.round((step / 5) * 100)}% Complete</span>
           </div>
           <div className="w-full bg-slate-200 rounded-full h-2">
             <div 
               className="bg-gradient-to-r from-blue-600 to-green-600 h-2 rounded-full transition-all duration-300"
-              style={{ width: `${(step / 4) * 100}%` }}
+              style={{ width: `${(step / 5) * 100}%` }}
             />
           </div>
         </div>

@@ -264,6 +371,7 @@ export const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) =
             <button
               onClick={handleNext}
               disabled={step === 1 && !formData.name}
               className="ml-auto flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50"
             >
-              <span>{step === 4 ? 'Complete Setup' : 'Next'}</span>
+              <span>{step === 5 ? 'Complete Setup' : 'Next'}</span>
               <ChevronRight className="w-5 h-5" />
             </button>
           </div>