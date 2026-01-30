import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  MessageSquare, 
  FileText, 
  TrendingUp, 
  DollarSign,
  Settings,
  Users
} from 'lucide-react'

const Sidebar = ({ role }) => {
  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/' },
    { icon: <CheckSquare size={20} />, label: 'Tasks', path: '/tasks' },
    { icon: <Calendar size={20} />, label: 'Leave', path: '/leave' },
    { icon: <MessageSquare size={20} />, label: 'Chat', path: '/chat' },
    { icon: <FileText size={20} />, label: 'Notes Area', path: '/notes' },
  ]

  const adminItems = [
    { icon: <TrendingUp size={20} />, label: 'Performance', path: '/performance' },
    { icon: <DollarSign size={20} />, label: 'Payroll', path: '/payroll' },
    { icon: <Users size={20} />, label: 'Team', path: '/team' },
  ]

  return (
    <aside className="w-64 border-r border-glass flex flex-col bg-[#0F172A] z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm rotate-45" />
          </div>
          <span className="font-bold text-lg tracking-tight">WorkNest</span>
        </div>
      </div>

      <div className="flex-1 px-4 py-4">
        <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4 px-4">Menu</p>
        <div className="space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? 'bg-primary/10 text-primary shadow-glow' : 'text-text-muted hover:bg-slate-800 hover:text-white'}
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>

        {role === 'ceo' && (
          <div className="mt-8">
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4 px-4">Executive</p>
            <div className="space-y-1">
              {adminItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive ? 'bg-primary/10 text-primary shadow-glow' : 'text-text-muted hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 mt-auto">
        <div className="glass-card p-4 bg-primary/5 border-primary/20">
          <p className="text-xs font-bold text-primary uppercase mb-1">Current Tier</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-amber-400 text-sm">Gold Elite</span>
          </div>
          <div className="mt-2 h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 w-3/4 rounded-full" />
          </div>
          <p className="text-[10px] text-text-muted mt-2">120 points to Platinum</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
