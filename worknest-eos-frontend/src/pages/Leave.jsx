import React, { useState } from 'react'
import { Calendar, Clock, Plus, Info, CheckCircle2, XCircle } from 'lucide-react'

const Leave = ({ user }) => {
  const [showModal, setShowModal] = useState(false)
  
  const leaveStats = [
    { label: 'Annual Leave', total: 15, used: 4, color: 'text-blue-400' },
    { label: 'Sick Leave', total: 10, used: 2, color: 'text-rose-400' },
    { label: 'Casual Leave', total: 5, used: 1, color: 'text-amber-400' }
  ]

  const history = [
    { id: 1, type: 'Annual', dates: 'Feb 12 - Feb 15', status: 'Approved', reason: 'Family vacation' },
    { id: 2, type: 'Sick', dates: 'Jan 05 - Jan 06', status: 'Approved', reason: 'Fever' },
    { id: 3, type: 'Casual', dates: 'Feb 28', status: 'Pending', reason: 'Personal work' }
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Leave Management</h2>
          <p className="text-text-muted">Track your time off and balance.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} /> Apply for Leave
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {leaveStats.map((stat, i) => (
          <div key={i} className="glass-card p-6 border-l-4" style={{ borderColor: 'currentColor' }}>
            <div className={`flex justify-between items-start ${stat.color}`}>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider mb-1 text-text-muted">{stat.label}</p>
                <h3 className="text-4xl font-bold">{stat.total - stat.used}</h3>
                <p className="text-[10px] font-bold uppercase mt-1">Days Remaining</p>
              </div>
              <Calendar size={24} />
            </div>
            <div className="mt-6 space-y-2">
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-current ${stat.color}`} 
                  style={{ width: `${(stat.used / stat.total) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-text-muted">
                <span>USED: {stat.used}</span>
                <span>TOTAL: {stat.total}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Leave History */}
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="text-xl font-bold mb-6">Request History</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-text-muted text-[10px] font-bold uppercase tracking-wider border-b border-glass pb-4">
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Dates</th>
                  <th className="pb-4">Reason</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {history.map((req) => (
                  <tr key={req.id} className="border-b border-glass/50 group hover:bg-slate-900/30 transition-colors">
                    <td className="py-4 font-semibold">{req.type}</td>
                    <td className="py-4 text-text-muted">{req.dates}</td>
                    <td className="py-4 text-text-muted">{req.reason}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                        req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4">
                      {req.status === 'Pending' && (
                        <button className="text-rose-400 hover:text-rose-300 font-bold text-[10px] uppercase">Cancel</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Company Calendar Snippet */}
        <div className="glass-card p-6">
          <h3 className="text-xl font-bold mb-6">Company Holidays</h3>
          <div className="space-y-4">
            {[
              { date: 'Jan 01', name: 'New Year Day', type: 'Fixed' },
              { date: 'Apr 14', name: 'Sinhala & Hindu New Year', type: 'Public' },
              { date: 'May 01', name: 'Labour Day', type: 'Public' },
              { date: 'Dec 25', name: 'Christmas Day', type: 'Fixed' }
            ].map((h, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-900/40 rounded-xl border border-glass">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center border border-primary/20">
                  <span className="text-[10px] font-bold text-primary uppercase">{h.date.split(' ')[0]}</span>
                  <span className="text-sm font-bold">{h.date.split(' ')[1]}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{h.name}</h4>
                  <p className="text-[10px] text-text-muted font-bold uppercase">{h.type} Holiday</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-sm bg-black/60">
          <div className="glass-card w-full max-w-md p-8 animate-fade-in shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">Request Leave</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Leave Type</label>
                <select className="w-full bg-slate-900 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary">
                  <option>Annual Leave</option>
                  <option>Sick Leave</option>
                  <option>Casual Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Start Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">End Date</label>
                  <input type="date" className="w-full bg-slate-900 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-text-muted uppercase mb-1 block">Reason</label>
                <textarea rows="3" className="w-full bg-slate-900 border border-glass rounded-lg px-4 py-3 focus:outline-none focus:border-primary" placeholder="Briefly explain the reason..." />
              </div>
              <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl flex gap-3 text-amber-500">
                <Info size={20} className="shrink-0" />
                <p className="text-xs font-medium">Your Team Lead will be notified to check resource availability before CEO approval.</p>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-3 rounded-xl border border-glass font-bold hover:bg-slate-800 transition-all">Cancel</button>
                <button onClick={() => setShowModal(false)} className="flex-1 btn-primary">Submit Request</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Leave
