import React, { useState } from 'react'
import { Send, Search, MoreVertical, Hash, User, Paperclip, Smile } from 'lucide-react'

const Chat = ({ user }) => {
  const [message, setMessage] = useState('')
  
  const channels = [
    { id: 'gen', name: 'general', type: 'channel' },
    { id: 'ann', name: 'announcements', type: 'channel' },
    { id: 'proj', name: 'client-aero-project', type: 'channel' }
  ]

  const directMessages = [
    { id: 'tl1', name: 'Sarah (Team Lead)', status: 'online', role: 'tl' },
    { id: 'ceo1', name: 'Arjun (CEO)', status: 'away', role: 'ceo' },
    { id: 'emp1', name: 'David (Employee)', status: 'offline', role: 'employee' }
  ]

  return (
    <div className="h-[calc(100vh-140px)] flex overflow-hidden glass-card">
      {/* Sidebar */}
      <div className="w-80 border-r border-glass flex flex-col bg-slate-900/20">
        <div className="p-6 border-b border-glass">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Jump to..." 
              className="w-full bg-slate-900 border border-glass rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 px-2">Channels</p>
            <div className="space-y-1">
              {channels.map(c => (
                <button key={c.id} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors text-sm text-text-muted hover:text-white">
                  <Hash size={14} className="text-primary/60" /> {c.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-3 px-2">Direct Messages</p>
            <div className="space-y-1">
              {directMessages.map(dm => (
                <button key={dm.id} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs">
                        {dm.name.charAt(0)}
                      </div>
                      <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0A0F1E] ${
                        dm.status === 'online' ? 'bg-emerald-500' : dm.status === 'away' ? 'bg-amber-500' : 'bg-slate-500'
                      }`} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-semibold">{dm.name}</p>
                      <p className="text-[10px] text-text-muted uppercase font-bold">{dm.role}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900/10">
        <div className="h-16 border-b border-glass flex items-center justify-between px-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">
              <Hash className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-bold">client-aero-project</h3>
              <p className="text-[10px] text-text-muted">Discussions related to Aero brand identity</p>
            </div>
          </div>
          <button className="p-2 hover:bg-slate-800 rounded-lg text-text-muted transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold">SM</div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-sm">Sarah (Team Lead)</span>
                <span className="text-[10px] text-text-muted">11:04 AM</span>
              </div>
              <p className="text-sm bg-slate-800/50 p-3 rounded-2xl rounded-tl-none border border-glass inline-block max-w-xl">
                Hey team, just wanted to check on the progress of the Aero logo. Arjun wants to see some drafts by EOD.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 flex-row-reverse">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center font-bold">Me</div>
            <div className="flex-1 flex flex-col items-end">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-[10px] text-text-muted">11:15 AM</span>
                <span className="font-bold text-sm">You</span>
              </div>
              <p className="text-sm bg-primary/20 p-3 rounded-2xl rounded-tr-none border border-primary/30 inline-block max-w-xl text-right">
                Drafts are looking good! Just polishing the color schemes. Will upload them to the task board shortly.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-text-muted py-4">
            <div className="flex-1 h-px bg-glass" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Today</span>
            <div className="flex-1 h-px bg-glass" />
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center font-bold">AJ</div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-sm">Arjun (CEO)</span>
                <span className="text-[10px] text-text-muted">12:30 PM</span>
              </div>
              <p className="text-sm bg-slate-800/50 p-3 rounded-2xl rounded-tl-none border border-glass inline-block max-w-xl">
                Great. Remember to link the discussions here to the checkpoints in the task manager. 
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 pt-0">
          <div className="bg-slate-900 border border-glass rounded-2xl p-2 flex items-end gap-2 focus-within:border-primary transition-all">
            <div className="flex flex-col flex-1">
              <textarea 
                rows="1"
                placeholder="Message #client-aero-project"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-transparent border-none focus:ring-0 p-3 text-sm resize-none focus:outline-none"
              />
              <div className="flex items-center gap-2 px-3 pb-2 text-text-muted">
                <button className="hover:text-white transition-colors"><Paperclip size={18} /></button>
                <button className="hover:text-white transition-colors"><Smile size={18} /></button>
                <button className="hover:text-white transition-colors ml-auto"><Hash size={18} /></button>
              </div>
            </div>
            <button className="bg-primary hover:bg-primary/80 text-white p-3 rounded-xl transition-all shadow-glow">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
