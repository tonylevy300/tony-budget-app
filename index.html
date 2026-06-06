import React, { useState, useEffect } from 'react';
import { Wallet, Coffee, Shield, Target, Plus, Trash2, AlertCircle, ArrowUpRight, ArrowDownRight, Settings, X } from 'lucide-react';

// Custom hook for Local Storage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default function App() {
  // Application State
  const [transactions, setTransactions] = useLocalStorage('tony_transactions', []);
  const [config, setConfig] = useLocalStorage('tony_config', {
    flexBudget: 3000,
    dateOverride: ''
  });
  
  // UI State
  const [amount, setAmount] = useState('');
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('flex'); // 'flex', 'fixed', 'vault', 'income', 'windfall'
  const [showSettings, setShowSettings] = useState(false);
  const [tempConfig, setTempConfig] = useState({ flexBudget: config.flexBudget, dateOverride: config.dateOverride, quickBalance: '' });

  // Live System Clock
  const [realToday, setRealToday] = useState(new Date());
  useEffect(() => {
    // Update the system clock every minute so it automatically ticks over at midnight
    const timer = setInterval(() => setRealToday(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // System Constants based on Blueprint
  const TARGETS = {
    fixed: 1627,
    flex: config.flexBudget || 3000,
    vault: 4373,
    windfall: 4000
  };

  // Date Logic (with Override support & 24th Payday Cycle)
  // If dateOverride exists, append time to avoid timezone date shifting
  const today = config.dateOverride ? new Date(`${config.dateOverride}T12:00:00`) : realToday;
  
  // Determine Pay Cycle Start and End Dates (24th to 23rd)
  const cycleStart = new Date(today);
  const cycleEnd = new Date(today);
  
  if (today.getDate() >= 24) {
    // We are past the 24th, so cycle is Current Month 24th -> Next Month 23rd
    cycleStart.setDate(24);
    cycleEnd.setMonth(cycleEnd.getMonth() + 1);
    cycleEnd.setDate(23);
  } else {
    // We are before the 24th, so cycle is Last Month 24th -> Current Month 23rd
    cycleStart.setMonth(cycleStart.getMonth() - 1);
    cycleStart.setDate(24);
    cycleEnd.setDate(23);
  }
  
  cycleStart.setHours(0, 0, 0, 0);
  cycleEnd.setHours(23, 59, 59, 999);

  // Calculate Days to Next Payday
  const diffTime = cycleEnd.getTime() - today.getTime();
  const daysLeft = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Filter transactions for the current pay cycle only
  const currentMonthTx = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= cycleStart && txDate <= cycleEnd;
  });

  // Calculate Totals
  const totals = currentMonthTx.reduce((acc, tx) => {
    if (tx.type === 'income' || tx.type === 'windfall') {
      acc.income += tx.amount;
    } else {
      acc[tx.type] += tx.amount;
    }
    return acc;
  }, { income: 0, flex: 0, fixed: 0, vault: 0 });

  // Pacing Calculations
  const flexRemaining = TARGETS.flex - totals.flex;
  const safeDailySpend = flexRemaining / daysLeft;

  // Handlers
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount === 0) return;

    const newTx = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      desc: desc || 'Categorized Item',
      type,
      // Use the 'today' variable so it logs on the overridden date if set
      date: today.toISOString()
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setDesc('');
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  };

  const handleSaveSettings = () => {
    setConfig({ 
      flexBudget: Number(tempConfig.flexBudget), 
      dateOverride: tempConfig.dateOverride 
    });

    // Handle Quick Balance Sync
    if (tempConfig.quickBalance !== '') {
      const desiredBalance = parseFloat(tempConfig.quickBalance);
      const newFlexRemaining = Number(tempConfig.flexBudget) - totals.flex;
      const diff = newFlexRemaining - desiredBalance;

      if (diff !== 0 && !isNaN(diff)) {
        const adjustmentTx = {
          id: Date.now().toString(),
          amount: diff,
          desc: 'System Balance Sync',
          type: 'flex',
          date: today.toISOString()
        };
        setTransactions([adjustmentTx, ...transactions]);
      }
    }
    
    // Reset temp quick balance and close
    setTempConfig({ ...tempConfig, quickBalance: '' });
    setShowSettings(false);
  };

  const handleResetCycle = () => {
    if (window.confirm("Are you sure you want to clear all transactions and start a fresh pay cycle? This cannot be undone.")) {
      setTransactions([]);
      setShowSettings(false);
    }
  };

  const openSettings = () => {
    setTempConfig({ flexBudget: config.flexBudget, dateOverride: config.dateOverride, quickBalance: '' });
    setShowSettings(true);
  };

  // Formatter
  const formatZAR = (num) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(num);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 pb-20 md:p-8 flex justify-center relative">
      <div className="max-w-md w-full space-y-6">
        
        {/* Header & Pacer Widget */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"></div>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-3">
                Daily HQ
                <button onClick={openSettings} className="text-slate-500 hover:text-white transition-colors bg-slate-950 p-1.5 rounded-lg border border-slate-800">
                  <Settings size={18} />
                </button>
              </h1>
              <p className="text-sm text-slate-300 mt-2 flex items-center gap-2 font-medium">
                {config.dateOverride ? (
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"></span>
                ) : (
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                )}
                {today.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                CYCLE: {cycleStart.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })} - {cycleEnd.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Days to Payday</p>
              <p className="text-2xl font-bold text-white font-mono">{daysLeft}</p>
            </div>
          </div>

          {/* The R100/Day Pacer */}
          <div className={`p-5 rounded-2xl border ${safeDailySpend < 50 ? 'bg-red-950/30 border-red-900/50' : 'bg-blue-950/30 border-blue-900/50'}`}>
            <p className="text-sm text-slate-300 mb-1 flex items-center gap-2">
              <Coffee size={16} className={safeDailySpend < 50 ? 'text-red-400' : 'text-blue-400'} /> 
              Safe Daily Spend Limit
            </p>
            <div className="flex items-end gap-2">
              <h2 className={`text-4xl font-bold font-mono tracking-tighter ${safeDailySpend < 50 ? 'text-red-400' : 'text-blue-400'}`}>
                {formatZAR(safeDailySpend)}
              </h2>
              <span className="text-slate-500 mb-1">/ day</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">
              You have {formatZAR(flexRemaining)} left in your flex fund.
            </p>
          </div>
        </div>

        {/* The 3 Core Buckets */}
        <div className="space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1">Blueprint Status</h2>
          
          <BucketProgress title="Survival / Flex" spent={totals.flex} target={TARGETS.flex} color="bg-blue-500" icon={<Wallet size={16} />} />
          <BucketProgress title="Fixed Costs" spent={totals.fixed} target={TARGETS.fixed} color="bg-slate-500" icon={<Shield size={16} />} />
          <BucketProgress title="Goal Savings" spent={totals.vault} target={TARGETS.vault} color="bg-emerald-500" icon={<Target size={16} />} isVault={true} />
        </div>

        {/* Quick Add Form */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl">
          <h2 className="text-sm font-semibold mb-4 text-white flex items-center gap-2">
            <Plus size={18} className="text-emerald-500"/> Log Transaction
          </h2>
          <form onSubmit={handleAddTransaction} className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R</span>
                <input 
                  type="number" 
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-mono"
                  required
                />
              </div>
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-4 text-sm text-white focus:outline-none focus:border-blue-500 transition-all cursor-pointer"
              >
                <option value="flex">Flex / Survival</option>
                <option value="fixed">Fixed Cost</option>
                <option value="vault">Save for Goals</option>
                <option value="income">Payday (+)</option>
                <option value="windfall">Windfall (+)</option>
              </select>
            </div>
            <input 
              type="text" 
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="What was it for? (e.g., Groceries, Rent)"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white text-sm placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-900/50">
              Add Transaction
            </button>
          </form>
        </div>

        {/* Transaction History */}
        <div className="pt-2">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500 ml-1 mb-3">Recent Logs</h2>
          {currentMonthTx.length === 0 ? (
            <div className="text-center py-8 text-slate-600 border border-dashed border-slate-800 rounded-2xl flex flex-col items-center">
              <AlertCircle size={24} className="mb-2 opacity-50" />
              <p className="text-sm">No transactions for this cycle.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {currentMonthTx.slice(0, 10).map(tx => (
                <div key={tx.id} className="flex items-center justify-between bg-slate-900 border border-slate-800 p-3 rounded-xl group hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      tx.type === 'income' || tx.type === 'windfall' ? 'bg-emerald-950/50 text-emerald-500' :
                      tx.type === 'flex' ? 'bg-blue-950/50 text-blue-500' :
                      tx.type === 'fixed' ? 'bg-slate-800 text-slate-400' :
                      'bg-purple-950/50 text-purple-500'
                    }`}>
                      {(tx.type === 'income' || tx.type === 'windfall') ? <ArrowDownRight size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{tx.desc}</p>
                      <p className="text-xs text-slate-500 capitalize">{tx.type} • {new Date(tx.date).toLocaleDateString('en-ZA', { month: 'short', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`text-sm font-bold font-mono ${(tx.type === 'income' || tx.type === 'windfall') ? 'text-emerald-400' : 'text-slate-300'}`}>
                      {(tx.type === 'income' || tx.type === 'windfall') ? '+' : '-'}{formatZAR(tx.amount)}
                    </p>
                    <button onClick={() => handleDelete(tx.id)} className="text-slate-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2"><Settings size={20}/> System Config</h2>
              <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white transition-colors"><X size={24}/></button>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Override Today's Date</label>
                <input 
                  type="date" 
                  value={tempConfig.dateOverride} 
                  onChange={(e) => setTempConfig({...tempConfig, dateOverride: e.target.value})} 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white focus:border-blue-500 outline-none transition-all" 
                />
                <p className="text-xs text-slate-500 mt-2">Leave blank to use your real-time system clock.</p>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Monthly Flex Budget (Base)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">R</span>
                  <input 
                    type="number" 
                    value={tempConfig.flexBudget} 
                    onChange={(e) => setTempConfig({...tempConfig, flexBudget: e.target.value})} 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-8 pr-4 text-white focus:border-blue-500 outline-none transition-all font-mono" 
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-950/30 border border-blue-900/50 rounded-xl">
                <label className="block text-xs font-semibold text-blue-300 uppercase tracking-wider mb-2">Quick Sync: Current Balance</label>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">If your app is out of sync with your bank, type your exact remaining Flex money here. The app will generate a background transaction to fix the math instantly.</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 font-bold">R</span>
                  <input 
                    type="number" 
                    placeholder="e.g. 1500" 
                    value={tempConfig.quickBalance} 
                    onChange={(e) => setTempConfig({...tempConfig, quickBalance: e.target.value})} 
                    className="w-full bg-slate-950 border border-blue-900/50 rounded-xl py-3 pl-8 pr-4 text-white focus:border-blue-500 outline-none transition-all font-mono placeholder-slate-700" 
                  />
                </div>
              </div>

              <button 
                onClick={handleSaveSettings} 
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl mt-2 transition-all shadow-lg shadow-indigo-900/50 flex justify-center items-center gap-2"
              >
                Save & Update System
              </button>

              <button 
                onClick={handleResetCycle} 
                className="w-full bg-red-950/30 hover:bg-red-900/40 text-red-400 border border-red-900/50 font-bold py-4 rounded-xl mt-4 transition-all flex justify-center items-center gap-2"
              >
                <Trash2 size={18} /> Start Fresh Cycle (Clear All Data)
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// Subcomponent for bucket progress bars
function BucketProgress({ title, spent, target, color, icon, isVault = false }) {
  const progress = Math.min(100, Math.max(0, (spent / target) * 100));
  const formatZAR = (num) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(num);
  
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <div className="flex justify-between items-end mb-2">
        <div className="flex items-center gap-2">
          <div className={`text-slate-400`}>{icon}</div>
          <h3 className="text-sm font-bold text-slate-200">{title}</h3>
        </div>
        <div className="text-right">
          <span className={`text-sm font-bold ${isVault ? 'text-emerald-400' : 'text-white'}`}>
            {formatZAR(spent)}
          </span>
          <span className="text-xs text-slate-500 ml-1">/ {formatZAR(target)}</span>
        </div>
      </div>
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div 
          className={`h-full transition-all duration-500 ease-out ${color}`}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2 text-right">
        {isVault ? 'Saved toward blueprint' : `${formatZAR(target - spent)} remaining`}
      </p>
    </div>
  );
}