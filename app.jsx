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
  const [type, setType] = useState('flex');
  const [showSettings, setShowSettings] = useState(false);
  const [tempConfig, setTempConfig] = useState({ flexBudget: config.flexBudget, dateOverride: config.dateOverride, quickBalance: '' });

  // Live System Clock
  const [realToday, setRealToday] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setRealToday(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // System Constants
  const TARGETS = {
    fixed: 1627,
    flex: config.flexBudget || 3000,
    vault: 4373,
    windfall: 4000
  };

  // Date Logic (with Override support & 24th Payday Cycle)
  const today = config.dateOverride ? new Date(`${config.dateOverride}T12:00:00`) : realToday;
  
  const cycleStart = new Date(today);
  const cycleEnd = new Date(today);
  
  if (today.getDate() >= 24) {
    cycleStart.setDate(24);
    cycleEnd.setMonth(cycleEnd.getMonth() + 1);
    cycleEnd.setDate(23);
  } else {
    cycleStart.setMonth(cycleStart.getMonth() - 1);
    cycleStart.setDate(24);
    cycleEnd.setDate(23);
  }
  
  cycleStart.setHours(0, 0, 0, 0);
  cycleEnd.setHours(23, 59, 59, 999);

  const diffTime = cycleEnd.getTime() - today.getTime();
  const daysLeft = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const currentMonthTx = transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= cycleStart && txDate <= cycleEnd;
  });

  const totals = currentMonthTx.reduce((acc, tx) => {
    if (tx.type === 'income' || tx.type === 'windfall') {
      acc.income += tx.amount;
    } else {
      acc[tx.type] = (acc[tx.type] || 0) + tx.amount;
    }
    return acc;
  }, { income: 0, flex: 0, fixed: 0, vault: 0 });

  const flexRemaining = TARGETS.flex - totals.flex;
  const safeDailySpend = flexRemaining / daysLeft;

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount === 0) return;
    const newTx = { id: Date.now().toString(), amount: parseFloat(amount), desc: desc || 'Categorized Item', type, date: today.toISOString() };
    setTransactions([newTx, ...transactions]);
    setAmount('');
    setDesc('');
  };

  const handleDelete = (id) => setTransactions(transactions.filter(tx => tx.id !== id));

  const handleSaveSettings = () => {
    setConfig({ flexBudget: Number(tempConfig.flexBudget), dateOverride: tempConfig.dateOverride });
    if (tempConfig.quickBalance !== '') {
      const desiredBalance = parseFloat(tempConfig.quickBalance);
      const newFlexRemaining = Number(tempConfig.flexBudget) - totals.flex;
      const diff = newFlexRemaining - desiredBalance;
      if (diff !== 0 && !isNaN(diff)) {
        setTransactions([{ id: Date.now().toString(), amount: diff, desc: 'System Balance Sync', type: 'flex', date: today.toISOString() }, ...transactions]);
      }
    }
    setTempConfig({ ...tempConfig, quickBalance: '' });
    setShowSettings(false);
  };

  const handleResetCycle = () => {
    if (window.confirm("Start fresh? This clears all current logs.")) {
      setTransactions([]);
      setShowSettings(false);
    }
  };

  const formatZAR = (num) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(num);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 pb-20 md:p-8 flex justify-center relative">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-3">Daily HQ
                <button onClick={() => { setTempConfig({ flexBudget: config.flexBudget, dateOverride: config.dateOverride, quickBalance: '' }); setShowSettings(true); }} className="text-slate-500 hover:text-white transition-colors bg-slate-950 p-1.5 rounded-lg border border-slate-800"><Settings size={18} /></button>
              </h1>
              <p className="text-sm text-slate-300 mt-2 font-medium">{today.toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Days to Payday</p>
              <p className="text-2xl font-bold text-white font-mono">{daysLeft}</p>
            </div>
          </div>
          <div className={`p-5 rounded-2xl border ${safeDailySpend < 50 ? 'bg-red-950/30 border-red-900/50' : 'bg-blue-950/30 border-blue-900/50'}`}>
            <p className="text-sm text-slate-300 mb-1">Safe Daily Spend Limit</p>
            <h2 className={`text-4xl font-bold font-mono ${safeDailySpend < 50 ? 'text-red-400' : 'text-blue-400'}`}>{formatZAR(safeDailySpend)}</h2>
          </div>
        </div>

        <div className="space-y-4">
          <BucketProgress title="Survival / Flex" spent={totals.flex} target={TARGETS.flex} color="bg-blue-500" icon={<Wallet size={16} />} />
          <BucketProgress title="Fixed Costs" spent={totals.fixed} target={TARGETS.fixed} color="bg-slate-500" icon={<Shield size={16} />} />
          <BucketProgress title="Goal Savings" spent={totals.vault} target={TARGETS.vault} color="bg-emerald-500" icon={<Target size={16} />} isVault={true} />
        </div>

        <form onSubmit={handleAddTransaction} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
          <div className="flex gap-2">
            <input type="number" step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white" />
            <select value={type} onChange={(e) => setType(e.target.value)} className="bg-slate-950 border border-slate-800 rounded-xl px-4 text-white">
              <option value="flex">Flex</option><option value="fixed">Fixed</option><option value="vault">Goal Savings</option>
            </select>
          </div>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Description" className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 px-4 text-white" />
          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl">Add Transaction</button>
        </form>

        {showSettings && (
          <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-3xl w-full max-w-md p-6">
               <button onClick={handleResetCycle} className="w-full bg-red-900 text-white py-3 rounded-xl mb-4">Start Fresh Cycle</button>
               <button onClick={handleSaveSettings} className="w-full bg-indigo-600 text-white py-3 rounded-xl">Save & Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function BucketProgress({ title, spent, target, color, icon, isVault = false }) {
  const progress = Math.min(100, Math.max(0, (spent / target) * 100));
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
      <div className="flex justify-between mb-2">
        <h3 className="text-sm font-bold">{title}</h3>
        <span className="text-xs">{new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(spent)} / {new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', minimumFractionDigits: 0 }).format(target)}</span>
      </div>
      <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
        <div className={`h-full ${color}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}