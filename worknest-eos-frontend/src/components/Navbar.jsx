import React, { useState, useEffect } from 'react'
import { LogOut, Bell, Clock, Play, Pause } from 'lucide-react'

const Navbar = ({ user }) => {
  const [checkedIn, setCheckedIn] = useState(false)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let interval
    if (checkedIn) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [checkedIn])

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <nav className="h-20 border-b border-glass flex items-center justify-between px-8 backdrop-blur-md bg-opacity-30">
      <div className="flex items-center gap-6">
        <h1 className="text-2xl font-bold text-gradient">WorkNest EOS</h1>
        
        {/* Attendance Controls */}
        <div className="flex items-center gap-3 bg-slate-900/50 p-1 rounded-full border border-glass px-4">
          <div className="flex items-center gap-2 mr-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="font-mono text-sm">{formatTime(timer)}</span>
          </div>
          <button 
            onClick={() => setCheckedIn(!checkedIn)}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              checkedIn 
              ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' 
              : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {checkedIn ? <><Pause className="w-4 h-4" /> Check Out</> : <><Play className="w-4 h-4" /> Check In</>}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group cursor-pointer">
          <Bell className="w-6 h-6 text-text-muted hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 rounded-full text-[10px] flex items-center justify-center font-bold">3</span>
        </div>

        <div className="flex items-center gap-4 pl-6 border-l border-glass">
          <div className="text-right">
            <p className="font-semibold text-sm">{user.name}</p>
            <p className="text-xs text-text-muted capitalize">{user.role}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold border-2 border-glass">
            {user.name.charAt(0)}
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-lg text-rose-400 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
