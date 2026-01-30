import React, { useState } from 'react'
import { ShieldCheck, User, Users, Briefcase } from 'lucide-react'

const Login = ({ onLogin }) => {
  const [loading, setLoading] = useState(false)

  const handleRoleSelect = (role) => {
    setLoading(true)
    setTimeout(() => {
      onLogin(role)
      setLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen bg-[#0A0F1E] flex flex-col items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="text-center mb-12 animate-fade-in">
        <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30 shadow-glow">
          <ShieldCheck size={40} className="text-primary" />
        </div>
        <h1 className="text-5xl font-bold text-white mb-2 tracking-tight">WorkNest <span className="text-gradient">EOS</span></h1>
        <p className="text-text-muted text-lg">Centralized Performance Hub for Strategic Marketing Co.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        {[
          { id: 'ceo', label: 'CEO / Admin', icon: <ShieldCheck className="text-amber-400" />, desc: 'Full System Control' },
          { id: 'tl', label: 'Team Lead', icon: <Users className="text-blue-400" />, desc: 'Project Management' },
          { id: 'employee', label: 'Employee', icon: <User className="text-emerald-400" />, desc: 'Daily Execution' }
        ].map((role) => (
          <button
            key={role.id}
            onClick={() => handleRoleSelect(role.id)}
            disabled={loading}
            className="group glass-card p-8 flex flex-col items-center text-center hover:scale-105 active:scale-95 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-slate-900/50 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors border border-glass">
              {role.icon}
            </div>
            <h3 className="font-bold text-xl mb-1">{role.label}</h3>
            <p className="text-sm text-text-muted">{role.desc}</p>
          </button>
        ))}
      </div>

      <div className="mt-12 text-center text-text-muted text-sm border-t border-glass pt-8 w-64">
        &copy; 2026 SMC Strategic Marketing Co.
      </div>
    </div>
  )
}

export default Login
