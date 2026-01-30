import React, { useState } from 'react'
import { Plus, Search, FileText, Star, Trash2, Edit2, Share2, Book } from 'lucide-react'

const Notes = ({ user }) => {
  const [selectedNote, setSelectedNote] = useState(0)
  
  const notes = [
    { id: 1, title: 'Company SOPs 2026', content: 'Detailed standard operating procedures for the marketing team...', category: 'General', date: '2 days ago', pinned: true },
    { id: 2, title: 'Aero Brand Guidelines', content: 'Colors: #6366f1, #0f172a, #f8fafc. Typography: Outfit, Inter...', category: 'Projects', date: 'Today', pinned: true },
    { id: 3, title: 'Ideas for February Campaign', content: '1. Gamified email series. 2. Interactive social media stories...', category: 'Brainstorm', date: '5 hours ago', pinned: false },
    { id: 4, title: 'Onboarding Checklist', content: 'Welcome email, System access, Team intro, Tool training...', category: 'HR', date: 'Jan 15', pinned: false }
  ]

  return (
    <div className="h-[calc(100vh-140px)] flex overflow-hidden glass-card">
      {/* Note List */}
      <div className="w-96 border-r border-glass flex flex-col bg-slate-900/20">
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Notes Area</h3>
            <button className="p-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition-all">
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input 
              type="text" 
              placeholder="Search notes..." 
              className="w-full bg-slate-900 border border-glass rounded-lg pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2">
          {notes.map((note, i) => (
            <button 
              key={note.id}
              onClick={() => setSelectedNote(i)}
              className={`w-full text-left p-4 rounded-xl transition-all border ${
                selectedNote === i ? 'bg-primary/10 border-primary/30 shadow-glow' : 'hover:bg-slate-800 border-transparent'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{note.category}</span>
                {note.pinned && <Star size={12} className="text-amber-400 fill-amber-400" />}
              </div>
              <h4 className="font-bold text-sm mb-1 line-clamp-1">{note.title}</h4>
              <p className="text-xs text-text-muted line-clamp-2">{note.content}</p>
              <p className="text-[10px] text-text-muted mt-3 font-bold">{note.date}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Editor / Viewer */}
      <div className="flex-1 flex flex-col bg-slate-900/10">
        <div className="p-8 border-b border-glass flex justify-between items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Book className="text-primary" size={20} />
              <span className="text-xs font-bold text-text-muted uppercase tracking-[0.2em]">{notes[selectedNote].category}</span>
            </div>
            <h2 className="text-3xl font-bold">{notes[selectedNote].title}</h2>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-slate-800 rounded-lg text-text-muted transition-colors"><Edit2 size={18} /></button>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-text-muted transition-colors"><Share2 size={18} /></button>
            <button className="p-2 hover:bg-slate-800 rounded-lg text-rose-400 transition-colors"><Trash2 size={18} /></button>
          </div>
        </div>
        
        <div className="flex-1 p-12 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg leading-relaxed text-slate-300">
              {notes[selectedNote].content}
            </p>
            <div className="h-px bg-glass w-full my-8" />
            <div className="prose prose-invert max-w-none">
              <h4 className="text-xl font-bold mb-4">Key Objectives</h4>
              <ul className="list-disc pl-6 space-y-3 text-slate-300">
                <li>Maintain consistency across all brand touchpoints.</li>
                <li>Ensure accessibility standards are met in every design.</li>
                <li>Collaborate with the content team for tone of voice alignment.</li>
                <li>Review performance metrics weekly and adjust strategies.</li>
              </ul>
              <div className="mt-8 p-6 bg-slate-900/60 rounded-2xl border border-glass">
                <h5 className="font-bold mb-2">Editor Notes</h5>
                <p className="text-sm text-text-muted Italics">
                  This document is a living repository. Please update it whenever a new design decision is finalized.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-glass flex justify-between items-center bg-slate-900/30">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-[#0A0F1E] flex items-center justify-center text-[10px] font-bold">JD</div>
            <div className="w-8 h-8 rounded-full bg-rose-500 border-2 border-[#0A0F1E] flex items-center justify-center text-[10px] font-bold">AS</div>
            <div className="px-3">
              <span className="text-xs text-text-muted">Last edited by Sarah 2 days ago</span>
            </div>
          </div>
          <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
             View Revision History <Plus size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Notes
