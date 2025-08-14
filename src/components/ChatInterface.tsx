@@ .. @@
 import React, { useState, useRef, useEffect } from 'react';
-import { Send, Bot, User, TrendingUp, DollarSign, Target, AlertCircle } from 'lucide-react';
-import { UserProfile } from '../App';
+import { Send, Bot, User, TrendingUp, DollarSign, Target, AlertCircle, BarChart3 } from 'lucide-react';
+import { StockChart } from './MarketAnalysis/StockChart';
+import { MarketOverview } from './MarketAnalysis/MarketOverview';
+import { Database } from '../lib/supabase';

+type UserProfile = Database['public']['Tables']['user_profiles']['Row'];
+
 interface ChatInterfaceProps {
   userProfile: UserProfile | null;
 }
@@ .. @@
   const [messages, setMessages] = useState<Message[]>([
     {
       id: '1',
-      text: `Hello ${userProfile?.name}! I'm your AI Investment Advisor. I can help you optimize your superannuation strategy, analyze market trends, and answer any investment questions you have. What would you like to know?`,
+      text: `Hello ${userProfile?.name}! I'm your AI Investment Advisor. I can help you optimize your superannuation strategy, analyze market trends, and answer any investment questions you have. I have access to your profile and can provide personalized recommendations. What would you like to know?`,
       sender: 'ai',
       timestamp: new Date(),
       suggestions: [
@@ -35,6 +40,9 @@ export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userProfile }) =>
   
   const [inputText, setInputText] = useState('');
   const [isTyping, setIsTyping] = useState(false);
+  const [showMarketAnalysis, setShowMarketAnalysis] = useState(false);
+  const [selectedStock, setSelectedStock] = useState<{ symbol: string; name: string } | null>(null);
   const messagesEndRef = useRef<HTMLDivElement>(null);

   const scrollToBottom = () => {
@@ .. @@
     const message = userMessage.toLowerCase();
     
     if (message.includes('maximize') || message.includes('increase') || message.includes('savings')) {
-      return `Based on your ${userProfile?.riskTolerance} risk profile and ${userProfile?.retirementAge! - userProfile?.age!} years to retirement, I recommend:
+      return `Based on your ${userProfile?.risk_tolerance} risk profile and ${userProfile?.retirement_age! - userProfile?.age!} years to retirement, I recommend:

 1. **Increase Contributions**: Consider boosting your monthly contribution by $200-300. This could add $45,000+ to your retirement balance.

@@ .. @@
     }
     
     if (message.includes('risk') || message.includes('tolerance')) {
-      return `Your current ${userProfile?.riskTolerance} risk profile suits your ${userProfile?.retirementAge! - userProfile?.age!}-year investment horizon well. Here's what this means:
+      return `Your current ${userProfile?.risk_tolerance} risk profile suits your ${userProfile?.retirement_age! - userProfile?.age!}-year investment horizon well. Here's what this means:

 **Current Allocation Benefits:**
 - Balanced growth potential with managed volatility
@@ .. @@
     }
     
     if (message.includes('contribute') || message.includes('monthly') || message.includes('much')) {
-      const current = userProfile?.monthlyContribution || 500;
+      const current = userProfile?.monthly_contribution || 500;
       const recommended = Math.round(current * 1.4);
       const difference = recommended - current;
       
-      return `Based on your goals and current balance of $${userProfile?.currentSuper.toLocaleString()}, here's my analysis:
+      return `Based on your goals and current balance of $${userProfile?.current_super.toLocaleString()}, here's my analysis:

 **Current Contribution:** $${current}/month
 **Recommended:** $${recommended}/month (+$${difference})

 **Impact of Increase:**
-- Additional retirement savings: ~$${Math.round(difference * 12 * (userProfile?.retirementAge! - userProfile?.age!) * 1.07).toLocaleString()}
+- Additional retirement savings: ~$${Math.round(difference * 12 * (userProfile?.retirement_age! - userProfile?.age!) * 1.07).toLocaleString()}
 - Tax benefits: Save ~$${Math.round(difference * 12 * 0.15)}/year
-- Retirement income boost: +$${Math.round(difference * 12 * (userProfile?.retirementAge! - userProfile?.age!) * 1.07 * 0.04 / 12)}/month
+- Retirement income boost: +$${Math.round(difference * 12 * (userProfile?.retirement_age! - userProfile?.age!) * 1.07 * 0.04 / 12)}/month

 **Ways to Increase:**
 1. Salary sacrifice (pre-tax)
@@ .. @@

 Should I help you calculate the optimal contribution strategy?`;
     }
+
+    if (message.includes('market') || message.includes('stock') || message.includes('etf') || message.includes('chart')) {
+      return `I can show you real-time market data and analysis! Based on your investment preferences, here are some key areas to watch:
+
+**Recommended ETFs for Your Profile:**
+- VAS.AX (Vanguard Australian Shares) - Core Australian equity exposure
+- VGS.AX (Vanguard International Shares) - Global diversification
+- VAF.AX (Vanguard Australian Fixed Interest) - Defensive allocation
+
+**Current Market Insights:**
+- Australian markets showing resilience with moderate volatility
+- International exposure remains important for diversification
+- Fixed income providing stability in uncertain times
+
+Would you like me to show you live charts and detailed analysis for any specific investments? I can display real-time price data, technical indicators, and market news.`;
+    }
     
     return `I understand you're asking about ${message}. Based on your profile:

-- Current Balance: $${userProfile?.currentSuper.toLocaleString()}
-- Risk Profile: ${userProfile?.riskTolerance}
-- Years to Retirement: ${userProfile?.retirementAge! - userProfile?.age!}
+- Current Balance: $${userProfile?.current_super.toLocaleString()}
+- Risk Profile: ${userProfile?.risk_tolerance}
+- Years to Retirement: ${userProfile?.retirement_age! - userProfile?.age!}

 Let me provide personalized advice. The superannuation landscape offers many opportunities for optimization, from asset allocation adjustments to contribution strategies and tax-effective structures.

@@ .. @@
   const quickActions = [
     { icon: TrendingUp, text: 'Portfolio Performance', color: 'bg-blue-500' },
     { icon: DollarSign, text: 'Increase Contributions', color: 'bg-green-500' },
     { icon: Target, text: 'Retirement Goals', color: 'bg-purple-500' },
-    { icon: AlertCircle, text: 'Risk Assessment', color: 'bg-orange-500' },
+    { icon: BarChart3, text: 'Market Analysis', color: 'bg-orange-500' },
   ];

+  const handleQuickAction = (text: string) => {
+    if (text === 'Market Analysis') {
+      setShowMarketAnalysis(true);
+    } else {
+      handleSendMessage(text);
+    }
+  };
+
+  const handleSelectStock = (symbol: string, name: string) => {
+    setSelectedStock({ symbol, name });
+  };
+
   return (
-    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
-      <div className="max-w-4xl mx-auto">
-        <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[700px] flex flex-col">
+    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
+      <div className="max-w-7xl mx-auto">
+        <div className={`grid gap-8 ${showMarketAnalysis ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
+          {/* Chat Interface */}
+          <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[700px] flex flex-col">
           {/* Header */}
           <div className="bg-gradient-to-r from-blue-600 to-green-600 px-6 py-4 text-white">
             <div className="flex items-center space-x-3">
@@ .. @@
                   return (
                     <button
                       key={index}
-                      onClick={() => handleSendMessage(action.text)}
+                      onClick={() => handleQuickAction(action.text)}
                       className="flex flex-col items-center p-3 rounded-lg border border-slate-200 hover:shadow-md transition-all duration-200"
                     >
                       <div className={`p-2 rounded-lg ${action.color} mb-2`}>
@@ .. @@
             </div>
           </div>
         </div>
+
+          {/* Market Analysis Panel */}
+          {showMarketAnalysis && (
+            <div className="space-y-6">
+              <div className="flex items-center justify-between">
+                <h2 className="text-2xl font-bold text-slate-900">Market Analysis</h2>
+                <button
+                  onClick={() => {
+                    setShowMarketAnalysis(false);
+                    setSelectedStock(null);
+                  }}
+                  className="text-slate-400 hover:text-slate-600 text-xl font-bold"
+                >
+                  ×
+                </button>
+              </div>
+              
+              {selectedStock ? (
+                <StockChart
+                  symbol={selectedStock.symbol}
+                  name={selectedStock.name}
+                  onClose={() => setSelectedStock(null)}
+                />
+              ) : (
+                <MarketOverview onSelectStock={handleSelectStock} />
+              )}
+            </div>
+          )}
+        </div>
       </div>
     </div>
   );