@@ .. @@
 interface HeaderProps {
   currentView: string;
-  setCurrentView: (view: 'onboarding' | 'dashboard' | 'chat' | 'education') => void;
+  setCurrentView: (view: 'landing' | 'onboarding' | 'dashboard' | 'chat' | 'education' | 'recommendations') => void;
   userProfile: UserProfile | null;
 }

 export const Header: React.FC<HeaderProps> = ({ currentView, setCurrentView, userProfile }) => {
   const navItems = [
     { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
     { id: 'chat', label: 'AI Advisor', icon: MessageCircle },
+    { id: 'recommendations', label: 'Recommendations', icon: TrendingUp },
     { id: 'education', label: 'Learn', icon: BookOpen },
   ];

   return (
-    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50">
+    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-slate-200 z-50 shadow-sm">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex justify-between items-center h-16">
           <div className="flex items-center space-x-3">
             <div className="p-2 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg">
               <TrendingUp className="w-6 h-6 text-white" />
             </div>
             <div>
               <h1 className="text-xl font-bold text-slate-900">SuperAI Advisor</h1>
               <p className="text-xs text-slate-600">Your AI Investment Guide</p>
             </div>
           </div>

           {userProfile && (
-            <nav className="flex items-center space-x-8">
+            <nav className="hidden md:flex items-center space-x-6">
               {navItems.map((item) => {
                 const Icon = item.icon;
                 const isActive = currentView === item.id;
                 
                 return (
                   <button
                     key={item.id}
                     onClick={() => setCurrentView(item.id as any)}
-                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
+                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                       isActive
-                        ? 'bg-blue-100 text-blue-700'
-                        : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
+                        ? 'bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-md'
+                        : 'text-slate-600 hover:text-blue-700 hover:bg-slate-100'
                     }`}
                   >
                     <Icon className="w-5 h-5" />
-                    <span className="font-medium">{item.label}</span>
+                    <span>{item.label}</span>
                   </button>
                 );
               })}
             </nav>
           )}

           {userProfile && (
             <div className="flex items-center space-x-3">
               <div className="text-right">
                 <p className="text-sm font-medium text-slate-900">Welcome, {userProfile.name}</p>
                 <p className="text-xs text-slate-600">Portfolio Balance: ${userProfile.currentSuper.toLocaleString()}</p>
               </div>
-              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center">
+              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center shadow-md">
                 <span className="text-white font-bold text-sm">{userProfile.name.charAt(0)}</span>
               </div>
             </div>
           )}
         </div>
       </div>
     </header>
   );
 };