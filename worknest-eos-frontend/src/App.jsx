import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Leave from './pages/Leave'
import Chat from './pages/Chat'
import Notes from './pages/Notes'
import Performance from './pages/Performance'
import Payroll from './pages/Payroll'

function App() {
  const [user, setUser] = useState(null) // role-based user state

  const handleLogin = (role) => {
    setUser({
      id: '1',
      name: role === 'ceo' ? 'Strategic CEO' : role === 'tl' ? 'Team Leader' : 'SMC Employee',
      role: role,
      tier: 'Gold'
    })
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        <Sidebar role={user.role} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar user={user} />
          <main className="flex-1 p-6 overflow-y-auto bg-[#0A0F1E]">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/tasks" element={<Tasks user={user} />} />
              <Route path="/leave" element={<Leave user={user} />} />
              <Route path="/chat" element={<Chat user={user} />} />
              <Route path="/notes" element={<Notes user={user} />} />
              {user.role === 'ceo' && (
                <>
                  <Route path="/performance" element={<Performance user={user} />} />
                  <Route path="/payroll" element={<Payroll user={user} />} />
                </>
              )}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App
