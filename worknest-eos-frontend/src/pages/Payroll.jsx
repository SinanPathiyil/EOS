import React, { useState } from 'react'
import { DollarSign, Wallet, CreditCard, PieChart, ArrowUpRight, ArrowDownRight, Printer } from 'lucide-react'

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('process')

  const payments = [
    { id: 1, name: 'John Doe', amount: '$4,200', date: 'Jan 28, 2026', method: 'Bank Transfer', status: 'Processed' },
    { id: 2, name: 'Alice Smith', amount: '$3,850', date: 'Jan 28, 2026', method: 'Bank Transfer', status: 'Processed' },
    { id: 3, name: 'Mark Wilson', amount: '$2,900', date: 'Jan 28, 2026', method: 'PayPal', status: 'Pending' }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Financial & Payroll Suite</h2>
          <p className="text-text-muted">Manage salary processing and financial reports.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
           Process Next Cycle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6">
          <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Total Payroll Monthly</p>
          <h3 className="text-2xl font-bold">$42,500</h3>
          <div className="flex items-center gap-1 text-[10px] text-rose-400 font-bold mt-2">
            <ArrowUpRight size={12} /> 12% vs last month
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Bonuses Allocated</p>
          <h3 className="text-2xl font-bold">$3,400</h3>
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold mt-2">
            <ArrowUpRight size={12} /> Tier-based incentives
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Pending Invoices</p>
          <h3 className="text-2xl font-bold">$8,200</h3>
          <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-2">
             Waiting for Client X
          </div>
        </div>
        <div className="glass-card p-6">
          <p className="text-[10px] font-bold text-text-muted uppercase mb-2">Active Workforce</p>
          <h3 className="text-2xl font-bold">24</h3>
          <div className="flex items-center gap-1 text-[10px] text-text-muted font-bold mt-2">
             All roles included
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold">Recent Salary Disbursements</h3>
            <button className="text-text-muted hover:text-white"><Printer size={20} /></button>
          </div>
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-text-muted uppercase border-b border-glass pb-4">
                <th className="pb-4">Employee</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Disbursed Date</th>
                <th className="pb-4">Method</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {payments.map(p => (
                <tr key={p.id} className="border-b border-glass/30 group">
                  <td className="py-4 font-bold">{p.name}</td>
                  <td className="py-4 font-mono">{p.amount}</td>
                  <td className="py-4 text-text-muted">{p.date}</td>
                  <td className="py-4 flex items-center gap-2">
                    {p.method === 'PayPal' ? <Wallet size={16} /> : <CreditCard size={16} />}
                    {p.method}
                  </td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      p.status === 'Processed' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">Incentive Structure</h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/20">
                <p className="text-xs font-bold text-emerald-400 mb-1">ELITE TIER (GREEN)</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm">Base Salary + 15% Bonus</span>
                  <ArrowUpRight size={16} className="text-emerald-400" />
                </div>
              </div>
              <div className="p-4 bg-amber-500/5 rounded-xl border border-amber-500/20">
                <p className="text-xs font-bold text-amber-400 mb-1">GOLD TIER</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm">Base Salary + 8% Bonus</span>
                  <ArrowUpRight size={16} className="text-amber-400" />
                </div>
              </div>
              <div className="p-4 bg-slate-900/40 rounded-xl border border-glass">
                <p className="text-xs font-bold text-text-muted mb-1">STANDARD TIER</p>
                <div className="flex justify-between items-end">
                  <span className="text-sm">Base Salary Standard</span>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-primary/10 to-transparent">
             <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
               <PieChart size={20} className="text-primary" /> Cost Distribution
             </h3>
             <div className="space-y-3">
               <div className="flex justify-between items-center text-xs">
                 <span>Operational</span>
                 <span className="font-bold">64%</span>
               </div>
               <div className="h-1 bg-slate-800 rounded-full">
                 <div className="h-full bg-primary w-[64%]" />
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span>Incentives</span>
                 <span className="font-bold">18%</span>
               </div>
               <div className="h-1 bg-slate-800 rounded-full">
                 <div className="h-full bg-emerald-400 w-[18%]" />
               </div>
               <div className="flex justify-between items-center text-xs">
                 <span>Marketing & Misc</span>
                 <span className="font-bold">18%</span>
               </div>
               <div className="h-1 bg-slate-800 rounded-full">
                 <div className="h-full bg-indigo-400 w-[18%]" />
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payroll
