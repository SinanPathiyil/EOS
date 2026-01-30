import React, { useState } from 'react'
import { Plus, Search, Filter, MoreVertical, MessageSquare, Paperclip, CheckSquare } from 'lucide-react'

const Tasks = ({ user }) => {
  const [activeTab, setActiveTab] = useState('board')
  
  const tasks = [
    { id: 1, title: 'Logo Design for "Aero"', status: 'in_progress', priority: 'high', checkpoints: '2/5', due: '2 days' },
    { id: 2, title: 'Social Media Strategy Jan', status: 'pending', priority: 'medium', checkpoints: '0/3', due: '5 days' },
    { id: 3, title: 'Website Copy Revamp', status: 'review', priority: 'high', checkpoints: '4/4', due: 'Today' },
    { id: 4, title: 'Email Campaign Setup', status: 'completed', priority: 'low', checkpoints: '6/6', due: 'Done' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'in_progress': return 'text-blue-400 bg-blue-500/10 border-blue-500/20'
      case 'review': return 'text-amber-400 bg-amber-500/10 border-amber-500/20'
      case 'completed': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20'
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Task Hub</h2>
          <p className="text-text-muted">Manage your daily deliverables and checkpoints.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              className="bg-slate-900/50 border border-glass rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary w-64"
            />
          </div>
          {user.role !== 'employee' && (
            <button className="btn-primary flex items-center gap-2">
              <Plus size={18} /> Create Task
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-glass pb-px">
        {['Board View', 'List View', 'My Assignments'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0])}
            className={`pb-4 text-sm font-bold transition-all relative ${
              (activeTab === tab.toLowerCase().split(' ')[0]) ? 'text-primary' : 'text-text-muted hover:text-white'
            }`}
          >
            {tab}
            {(activeTab === tab.toLowerCase().split(' ')[0]) && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-glow" />
            )}
          </button>
        ))}
      </div>

      {/* Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {['Pending', 'In Progress', 'Review', 'Completed'].map((column) => (
          <div key={column} className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  column === 'Pending' ? 'bg-slate-400' : 
                  column === 'In Progress' ? 'bg-blue-400' : 
                  column === 'Review' ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <h3 className="font-bold text-sm uppercase tracking-wider">{column}</h3>
                <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded-full text-text-muted">
                  {tasks.filter(t => t.status === column.toLowerCase().replace(' ', '_')).length}
                </span>
              </div>
              <button className="p-1 hover:bg-slate-800 rounded transition-colors text-text-muted">
                <Plus size={16} />
              </button>
            </div>

            <div className="space-y-4 min-h-[500px] p-2 rounded-2xl bg-slate-900/20 border border-glass/5">
              {tasks.filter(t => t.status === column.toLowerCase().replace(' ', '_')).map((task) => (
                <div key={task.id} className="glass-card p-4 space-y-4 cursor-grab active:cursor-grabbing hover:border-primary/30">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${getStatusColor(task.status)}`}>
                      {task.priority}
                    </span>
                    <button className="text-text-muted hover:text-white"><MoreVertical size={14} /></button>
                  </div>
                  <h4 className="font-bold text-sm leading-tight">{task.title}</h4>
                  
                  <div className="flex items-center gap-3 text-text-muted">
                    <div className="flex items-center gap-1 text-[10px]">
                      <CheckSquare size={12} /> {task.checkpoints}
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <MessageSquare size={12} /> 3
                    </div>
                    <div className="flex items-center gap-1 text-[10px]">
                      <Paperclip size={12} /> 1
                    </div>
                  </div>

                  <div className="pt-3 border-t border-glass flex justify-between items-center">
                    <div className="flex -space-x-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-500 border border-slate-900 flex items-center justify-center text-[8px] font-bold">JD</div>
                      <div className="w-6 h-6 rounded-full bg-rose-500 border border-slate-900 flex items-center justify-center text-[8px] font-bold">AS</div>
                    </div>
                    <span className="text-[10px] font-bold text-rose-400">Due {task.due}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tasks
