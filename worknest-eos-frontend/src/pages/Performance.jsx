import React from 'react'
import { TrendingUp, Users, Activity, Target, Download, MoreHorizontal } from 'lucide-react'

const Performance = () => {
  const employees = [
    { name: 'John Doe', role: 'Graphic Designer', points: 2850, tier: 'Green', efficiency: '94%', tasks: 45 },
    { name: 'Alice Smith', role: 'Content Writer', points: 2600, tier: 'Gold', efficiency: '88%', tasks: 38 },
    { name: 'Mark Wilson', role: 'Marketing Op', points: 1950, tier: 'Blue', efficiency: '72%', tasks: 31 },
    { name: 'Emma Brown', role: 'Social Media', points: 1400, tier: 'Yellow', efficiency: '65%', tasks: 24 },
    { name: 'Steve Rogers', role: 'Support', points: 900, tier: 'Orange', efficiency: '54%', tasks: 18 }
  ]

  const getTierColor = (tier) => {
    switch (tier) {
      case 'Green': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      case 'Gold': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      case 'Blue': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'Yellow': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
      case 'Orange': return 'text-orange-400 bg-orange-500/10 border-orange-500/20'
      default: return 'text-slate-400'
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Performance Analytics</h2>
          <p className="text-text-muted">Deep-dive into SMC's human capital and output.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-glass rounded-lg font-bold text-sm hover:bg-slate-800 transition-all">
          <Download size={18} /> Export Reports
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-b-4 border-primary">
          <p className="text-xs font-bold text-text-muted uppercase mb-2">Company Efficiency</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold">82%</h3>
            <span className="text-emerald-400 text-xs font-bold font-mono">+4.2%</span>
          </div>
          <Activity size={32} className="absolute top-6 right-6 text-primary/20" />
        </div>
        <div className="glass-card p-6 border-b-4 border-amber-400">
          <p className="text-xs font-bold text-text-muted uppercase mb-2">Avg. Focus Time</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold">6.8h</h3>
            <span className="text-emerald-400 text-xs font-bold font-mono">+0.5h</span>
          </div>
          <Target size={32} className="absolute top-6 right-6 text-amber-400/20" />
        </div>
        <div className="glass-card p-6 border-b-4 border-emerald-400">
          <p className="text-xs font-bold text-text-muted uppercase mb-2">Top Tier Count</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-bold">12</h3>
            <span className="text-emerald-400 text-xs font-bold font-mono">+2</span>
          </div>
          <Users size={32} className="absolute top-6 right-6 text-emerald-400/20" />
        </div>
      </div>

      <div className="glass-card p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold">Individual Employee Rankings</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-primary/20 text-primary border border-primary/30 rounded-lg text-xs font-bold">Daily</button>
            <button className="px-3 py-1 text-text-muted hover:bg-slate-800 rounded-lg text-xs font-bold transition-all">Weekly</button>
            <button className="px-3 py-1 text-text-muted hover:bg-slate-800 rounded-lg text-xs font-bold transition-all">Monthly</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-glass pb-4">
                <th className="pb-4">Employee</th>
                <th className="pb-4">Output Points</th>
                <th className="pb-4">Performance Tier</th>
                <th className="pb-4">Efficiency</th>
                <th className="pb-4">Tasks done</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {employees.map((emp, i) => (
                <tr key={i} className="border-b border-glass/30 hover:bg-slate-900/40 transition-colors">
                  <td className="py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs border border-glass">
                        {emp.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold">{emp.name}</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold">{emp.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="font-mono font-bold text-lg">{emp.points.toLocaleString()}</span>
                  </td>
                  <td className="py-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase border ${getTierColor(emp.tier)}`}>
                      {emp.tier}
                    </span>
                  </td>
                  <td className="py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: emp.efficiency }} />
                      </div>
                      <span className="text-xs font-bold">{emp.efficiency}</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="font-bold">{emp.tasks} / 50</span>
                  </td>
                  <td className="py-6">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-colors"><MoreHorizontal size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Performance
