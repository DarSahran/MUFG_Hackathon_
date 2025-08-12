@@ .. @@
   const simulateAIResponse = (userMessage: string): string => {
     const message = userMessage.toLowerCase();
     
+    if (message.includes('portfolio') || message.includes('recommendation') || message.includes('allocation')) {
+      return `Based on your current portfolio and ${userProfile?.riskTolerance} risk profile, I've identified several optimization opportunities:
+
+**Current Allocation Analysis:**
+- Your portfolio is currently weighted towards defensive assets
+- With ${userProfile?.retirementAge! - userProfile?.age!} years to retirement, you have time for more growth exposure
+- International diversification could be improved
+
+**Key Recommendations:**
+1. **Increase Growth Assets**: Move from 60% to 75% growth allocation
+2. **International Exposure**: Add 10% more international shares
+3. **Reduce Cash**: Lower cash holdings from 5% to 2%
+
+**Expected Impact:**
+- Potential additional retirement savings: $85,000 - $120,000
+- Improved risk-adjusted returns through diversification
+- Better inflation protection over your investment timeline
+
+Would you like me to show you the detailed portfolio recommendations or explain any of these strategies further?`;
+    }
+    
     if (message.includes('maximize') || message.includes('increase') || message.includes('savings')) {
       return `Based on your ${userProfile?.riskTolerance} risk profile and ${userProfile?.retirementAge! - userProfile?.age!} years to retirement, I recommend:

 1. **Increase Contributions**: Consider boosting your monthly contribution by $200-300. This could add $45,000+ to your retirement balance.

@@ .. @@
         'Portfolio Performance',
         'Increase Contributions', 
         'Retirement Goals',
-        'Risk Assessment'
+        'Risk Assessment',
+        'View Recommendations'
       ];

   const quickActions = [
@@ .. @@
     { icon: DollarSign, text: 'Increase Contributions', color: 'bg-green-500' },
     { icon: Target, text: 'Retirement Goals', color: 'bg-purple-500' },
     { icon: AlertCircle, text: 'Risk Assessment', color: 'bg-orange-500' },
+    { icon: TrendingUp, text: 'View Recommendations', color: 'bg-indigo-500' },
   ];

   return (
@@ .. @@
           {/* Quick Actions */}
           {messages.length <= 1 && (
             <div className="p-6 border-b border-slate-200">
               <h3 className="text-sm font-medium text-slate-700 mb-3">Quick Actions</h3>
-              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
+              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                 {quickActions.map((action, index) => {
                   const Icon = action.icon;
                   return (