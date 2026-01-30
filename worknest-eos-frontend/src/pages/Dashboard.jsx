import React from 'react'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react'

const Dashboard = ({ user }) => {
  const stats = [
    { label: 'Active Projects', value: '12', icon: <Layers className="text-blue-400" />, trend: '+2' },
    { label: 'Focus Time', value: '6.4h', icon: <Clock className="text-emerald-400" />, trend: '82%' },
    { label: 'Tasks Done', value: '28', icon: <CheckCircle2 className="text-primary" />, trend: '+5' },
    { label: 'Current Tier', value: 'Gold', icon: <TrendingUp className="text-amber-400" />, trend: 'Top 5%' }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-bold mb-1">Welcome back, {user.name.split(' ')[0]}!</h2>
          <p className="text-text-muted">Here's what's happening at SMC today.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 border-emerald-500/20 bg-emerald-500/5">
            <span className="text-xs font-bold text-emerald-400 uppercase">System Status</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-sm font-semibold">Active Monitoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="glass-card p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
              {React.cloneElement(stat.icon, { size: 48 })}
            </div>
            <p className="text-sm font-bold text-text-muted uppercase tracking-wider mb-2">{stat.label}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className="text-xs font-bold text-emerald-400">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed / Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Priority Tasks</h3>
              <button className="text-primary text-sm font-bold flex items-center gap-1 hover:underline">
                View All <ArrowRight size={14} />
              </button>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((t) => (
                <div key={t} className="flex items-center justify-between p-4 bg-slate-900/40 rounded-xl border border-glass hover:bg-slate-900/60 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Layers size={20} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm">Design Brand Identity for Client X</h4>
                      <p className="text-xs text-text-muted">Assigned by Team Lead &bull; 2h remaining</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-amber-500/10 text-amber-500 text-[10px] font-bold rounded-full border border-amber-500/20 uppercase">Hard Deadline</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-6">Productivity Analytics</h3>
            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {[40, 70, 45, 90, 65, 80, 50, 85].map((h, i) => (
                <div key={i} className="flex-1 space-y-2 group flex flex-col items-center">
                  <div className="w-full bg-primary/20 rounded-t-lg relative transition-all group-hover:bg-primary/40" style={{ height: `${h}%` }}>
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {h}% Focus
                    </div>
                  </div>
                  <span className="text-[10px] text-text-muted font-bold">{['M', 'T', 'W', 'T', 'F', 'S', 'S', 'M'][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <BarChart3 className="text-primary" size={20} /> Performance Tier
            </h3>
            <div className="flex flex-col items-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
                  <circle cx="64" cy="64" r="58" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="364.4" strokeDashoffset="91.1" className="text-amber-400" />
                </svg>
                <div className="absolute text-center">
                  <span className="text-2xl font-bold text-amber-400">Gold</span>
                  <p className="text-[10px] text-text-muted font-bold">TOP 5%</p>
                </div>
              </div>
              <p className="text-center text-sm text-text-muted mt-6 px-4">
                You're in the <span className="text-white font-bold">Elite Tier</span>. Keep it up to qualify for the Monthly Bonus!
              </p>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-bold mb-4">SMC Announcements</h3>
            <div className="space-y-4">
              <div className="p-3 bg-slate-900/40 rounded-lg border-l-4 border-primary">
                <p className="text-xs font-bold text-primary mb-1">NEW SOP</p>
                <p className="text-sm">Updated Brand Guidelines for 2026 are now in Notes.</p>
              </div>
              <div className="p-3 bg-slate-900/40 rounded-lg border-l-4 border-amber-500">
                <p className="text-xs font-bold text-amber-500 mb-1">EVENT</p>
                <p className="text-sm">SMC Quarterly Review: Feb 2nd, 10:00 AM.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
