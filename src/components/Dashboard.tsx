@@ .. @@
 interface DashboardProps {
   userProfile: UserProfile | null;
+  onViewRecommendations: () => void;
 }

-export const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
+export const Dashboard: React.FC<DashboardProps> = ({ userProfile, onViewRecommendations }) => {
   if (!userProfile) return null;

   const projectedBalance = Math.round(
@@ -33,6 +34,7 @@ export const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
       type: 'Increase Contribution',
       description: 'Consider increasing your monthly contribution by $100 to boost your retirement savings',
       impact: '+$15,000 at retirement',
-      priority: 'high'
+      priority: 'high',
+      action: () => onViewRecommendations()
     },
     {
       type: 'Rebalance Portfolio',
       description: 'Your current allocation could benefit from more international exposure',
       impact: 'Improved diversification',
-      priority: 'medium'
+      priority: 'medium',
+      action: () => onViewRecommendations()
     },
     {
       type: 'Tax Optimization',
       description: 'Salary sacrifice additional contributions for tax benefits',
       impact: 'Save $800 annually in tax',
-      priority: 'high'
+      priority: 'high',
+      action: () => onViewRecommendations()
     }
   ];

@@ .. @@
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {recommendations.map((rec, index) => (
-              <div key={index} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
+              <div key={index} className="border border-slate-200 rounded-lg p-5 hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={rec.action}>
                 <div className="flex items-start justify-between mb-3">
                   <h3 className="font-bold text-slate-900">{rec.type}</h3>
                   <span className={`px-2 py-1 text-xs font-medium rounded-full ${
@@ -178,6 +186,7 @@ export const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
                 <div className="flex items-center space-x-2">
                   <AlertCircle className="w-4 h-4 text-green-600" />
                   <span className="text-green-600 text-sm font-medium">{rec.impact}</span>
                 </div>
+                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
+                  <span className="text-blue-600 text-sm font-medium">Click to view details →</span>
+                </div>
               </div>
             ))}
           </div>