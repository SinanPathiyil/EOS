// ==================== WorkNest EOS - Main Application ====================

import './style.css';

// ==================== Configuration ====================

const CONFIG = {
  API_BASE_URL: 'http://localhost:8000/api',
  APP_NAME: 'WorkNest EOS',
  APP_SUBTITLE: 'Enterprise Operations System'
};

// ==================== State Management ====================

const AppState = {
  currentUser: null,
  currentView: 'login',
  isAuthenticated: false,
  tasks: [],
  leaves: [],
  messages: [],
  notes: [],
  performance: null,
  isClockedIn: false,
  clockInData: {
    todayHours: 0,
    startTime: null,
    mouseEvents: 0,
    keyboardEvents: 0,
    activeTime: 0,
    idleTime: 0
  }
};

// ==================== Utility Functions ====================

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.innerHTML = `
    <div style="
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                    type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                    'linear-gradient(135deg, #0b0b0d, #1f2126)'};
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      font-weight: 600;
    ">
      ${message}
    </div>
  `;
  document.body.appendChild(notification);
  setTimeout(() => notification.remove(), 3000);
}

// ==================== Icons (SVG) ====================

const Icons = {
  dashboard: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>`,
  tasks: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>`,
  users: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>`,
  calendar: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>`,
  chat: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>`,
  notes: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
  analytics: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>`,
  clock: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  logout: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>`,
  star: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>`,
  checkCircle: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>`,
  plus: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>`,
  send: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>`,
  trendUp: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>`
};

// ==================== Sidebar ====================

function renderSidebar(role) {
  const navItems = getNavItemsByRole(role);
  return `
    <aside class="sidebar">
      <div class="logo-section">
        <div class="logo">${CONFIG.APP_NAME}</div>
        <div class="logo-subtitle">${CONFIG.APP_SUBTITLE}</div>
      </div>
      <nav class="nav-menu">
        ${navItems.map(item => `
          <a href="#" class="nav-item ${item.view === AppState.currentView ? 'active' : ''}" data-view="${item.view}">
            <span class="nav-icon">${Icons[item.icon]}</span><span>${item.label}</span>
          </a>
        `).join('')}
      </nav>
      <div class="nav-item" id="logout-btn">
        <span class="nav-icon">${Icons.logout}</span><span>Logout</span>
      </div>
    </aside>
  `;
}

function getNavItemsByRole(role) {
  if (role === 'admin' || role === 'ceo') {
    return [
      { label: 'Dashboard', icon: 'dashboard', view: 'dashboard' },
      { label: 'Projects', icon: 'tasks', view: 'projects' },
      { label: 'Leave Management', icon: 'calendar', view: 'leaves' },
      { label: 'Messages', icon: 'chat', view: 'messages' },
      { label: 'Notes', icon: 'notes', view: 'notes' },
      { label: 'Analytics', icon: 'analytics', view: 'analytics' },
      { label: 'Team', icon: 'users', view: 'team' }
    ];
  } else if (role === 'team_lead') {
    return [
      { label: 'Dashboard', icon: 'dashboard', view: 'dashboard' },
      { label: 'Tasks', icon: 'tasks', view: 'tasks' },
      { label: 'Leave Management', icon: 'calendar', view: 'leaves' },
      { label: 'Messages', icon: 'chat', view: 'messages' },
      { label: 'Notes', icon: 'notes', view: 'notes' },
      { label: 'Team', icon: 'users', view: 'team' }
    ];
  }
  // Employee
  return [
    { label: 'Dashboard', icon: 'dashboard', view: 'dashboard' },
    { label: 'Tasks', icon: 'tasks', view: 'tasks' },
    { label: 'Attendance', icon: 'clock', view: 'attendance' },
    { label: 'Leave Management', icon: 'calendar', view: 'leaves' },
    { label: 'Messages', icon: 'chat', view: 'messages' },
    { label: 'Notes', icon: 'notes', view: 'notes' }
  ];
}

// ==================== View: Login ====================

function renderLoginScreen() {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px;">
      <div class="glass-card" style="max-width: 450px; width: 100%;">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1>${CONFIG.APP_NAME}</h1>
          <p style="color: var(--color-text-tertiary); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">${CONFIG.APP_SUBTITLE}</p>
        </div>
        <form id="login-form">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" id="email" class="form-input" placeholder="your.email@company.com" required />
          </div>
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" id="password" class="form-input" placeholder="••••••••" required />
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center; margin-top: 24px;">Sign In</button>
        </form>
        <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
          <p style="text-align: center; color: var(--color-text-tertiary); font-size: 0.85rem; margin-bottom: 16px;">Demo Accounts</p>
          <div style="display: grid; gap: 8px; font-size: 0.85rem;">
            <div style="background: rgba(11,11,13,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(11,11,13,0.1);"><strong style="color: var(--color-primary);">CEO:</strong> <span style="color: var(--color-text-secondary);">ceo@demo.com / demo123</span></div>
            <div style="background: rgba(11,11,13,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(11,11,13,0.1);"><strong style="color: var(--color-primary);">Team Lead:</strong> <span style="color: var(--color-text-secondary);">lead@demo.com / demo123</span></div>
            <div style="background: rgba(11,11,13,0.05); padding: 12px; border-radius: 8px; border: 1px solid rgba(11,11,13,0.1);"><strong style="color: var(--color-primary);">Employee:</strong> <span style="color: var(--color-text-secondary);">employee@demo.com / demo123</span></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ==================== View: Dashboard ====================

function renderDashboardView() {
  const role = AppState.currentUser?.role || 'employee';
  const stats = getDashboardStats(role);
  
  return `
    <div class="main-content">
      <div class="dashboard-header">
        <p class="welcome-text">Welcome back,</p>
        <h1>${AppState.currentUser?.name || 'User'}</h1>
      </div>
      <div class="stats-grid">
        ${stats.map(stat => `
          <div class="stat-card glass-card">
            <div class="stat-header">
              <span class="stat-label">${stat.label}</span>
              <div class="stat-icon" style="background: ${stat.color}22;"><span class="nav-icon" style="color: ${stat.color};">${Icons[stat.icon]}</span></div>
            </div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-trend trend-up"><span class="nav-icon" style="width: 14px;">${Icons.trendUp}</span><span>${stat.trend}</span></div>
          </div>
        `).join('')}
      </div>
      ${role === 'admin' ? renderCEODashboardContent() : role === 'team_lead' ? renderTeamLeadDashboardContent() : renderEmployeeDashboardContent()}
    </div>
  `;
}

function getDashboardStats(role) {
  if (role === 'admin') return [
    { label: 'Total Employees', value: '47', trend: '+3', icon: 'users', color: '#0b0b0d' },
    { label: 'Active Tasks', value: '132', trend: '+12', icon: 'tasks', color: '#1f2126' },
    { label: 'Completion Rate', value: '89%', trend: '+5%', icon: 'checkCircle', color: '#10b981' },
    { label: 'Avg. Performance', value: '8.2', trend: '+0.3', icon: 'star', color: '#f59e0b' }
  ];
  if (role === 'team_lead') return [
    { label: 'Team Members', value: '12', trend: '+1', icon: 'users', color: '#0b0b0d' },
    { label: 'Active Tasks', value: '28', trend: '+5', icon: 'tasks', color: '#1f2126' },
    { label: 'Completion Rate', value: '92%', trend: '+3%', icon: 'checkCircle', color: '#10b981' },
    { label: 'Team Capacity', value: '85%', trend: '-2%', icon: 'analytics', color: '#f59e0b' }
  ];
  return [
    { label: 'Tasks Assigned', value: '8', trend: '+2', icon: 'tasks', color: '#1f2126' },
    { label: 'Completed Today', value: '3', trend: '+1', icon: 'checkCircle', color: '#10b981' },
    { label: 'Hours Logged', value: '6.5h', trend: '+0.5h', icon: 'clock', color: '#0b0b0d' },
    { label: 'Performance', value: 'High', trend: '↑', icon: 'star', color: '#f59e0b' }
  ];
}

function renderCEODashboardContent() {
  return `<div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 32px;">
    <div class="glass-card"><h3 style="margin-bottom: 24px;">Pending Leave Requests</h3>${renderLeaveRequests()}</div>
    <div class="glass-card"><h3 style="margin-bottom: 24px;">Performance</h3>${renderPerformanceBars()}</div>
  </div>`;
}

function renderTeamLeadDashboardContent() {
  return `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 32px;">
    <div class="glass-card"><h3>Team Tasks</h3>${renderTasksOverview()}</div>
    <div class="glass-card"><h3>Team Status</h3>${renderTeamStatus()}</div>
  </div>`;
}

function renderEmployeeDashboardContent() {
  return `
    <div class="glass-card" style="margin-top: 32px;"><h3 style="margin-bottom: 24px;">Quick Actions</h3>
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
        <button class="btn btn-ghost nav-item" data-view="attendance" style="padding: 24px; display: flex; flex-direction: column; gap: 12px; align-items: center; border: 1px solid rgba(11,11,13,0.1);">
          <span class="nav-icon" style="width: 32px; height: 32px;">${Icons.clock}</span>
          <strong>Attendance</strong>
        </button>
        <button class="btn btn-ghost nav-item" data-view="tasks" style="padding: 24px; display: flex; flex-direction: column; gap: 12px; align-items: center; border: 1px solid rgba(11,11,13,0.1);">
          <span class="nav-icon" style="width: 32px; height: 32px;">${Icons.tasks}</span>
          <strong>My Tasks</strong>
        </button>
        <button class="btn btn-ghost nav-item" data-view="leaves" style="padding: 24px; display: flex; flex-direction: column; gap: 12px; align-items: center; border: 1px solid rgba(11,11,13,0.1);">
          <span class="nav-icon" style="width: 32px; height: 32px;">${Icons.calendar}</span>
          <strong>Leave Dept.</strong>
        </button>
      </div>
    </div>
    <div class="glass-card" style="margin-top: 32px;"><h3 style="margin-bottom: 24px;">My Tasks</h3>${renderEmployeeTasks()}</div>
  `;
}

function renderAttendanceView() {
  return `
    <div class="main-content">
      <div style="margin-bottom: 32px;">
        <h1 style="text-transform: uppercase;">Time & Attendance</h1>
        <p style="color: var(--color-text-tertiary); margin-top: 8px;">Monitor your work hours and digital activity metrics</p>
      </div>
      ${renderTimeTracker()}
    </div>
  `;
}

function renderTimeTracker() {
  const data = AppState.clockInData;
  const isClockedIn = AppState.isClockedIn;
  
  return `
    <div class="time-tracker-card animated">
      <div class="time-tracker-header">
        <h2 class="time-tracker-title">
          <span class="nav-icon" style="width: 24px;">${Icons.clock}</span>
          Time Tracker
          ${isClockedIn ? `
            <span class="time-tracker-live-badge">
              <span class="live-dot"></span>
              LIVE
            </span>
          ` : ''}
        </h2>
      </div>

      <div class="time-tracker-content">
        <!-- Left: Status & Hours -->
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <div class="time-tracker-status-box">
            <span class="time-tracker-label">Current Status</span>
            <div class="time-tracker-status-info">
              <div class="status-indicator ${isClockedIn ? 'status-active' : 'status-inactive'}"></div>
              <span>${isClockedIn ? "Active & Clocked In" : "Offline / Clocked Out"}</span>
            </div>
            ${isClockedIn && data.startTime ? `
              <p style="margin-top: 8px; font-size: 0.85rem; color: var(--color-text-tertiary); font-weight: 600;">
                Started at ${new Date(data.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            ` : ''}
          </div>

          <div class="time-tracker-hours-card">
            <div class="time-tracker-hours-icon">
              <span class="nav-icon" style="width: 28px; height: 28px;">${Icons.clock}</span>
            </div>
            <div>
              <p class="time-tracker-label" style="color: rgba(255,255,255,0.6); margin-bottom: 4px;">Today's Active Time</p>
              <div class="time-tracker-hours-value">${data.todayHours.toFixed(2)} hrs</div>
              ${isClockedIn ? `
                <div class="time-tracker-hours-hint">
                  <span class="sync-dot"></span>
                  Syncing live with agent
                </div>
              ` : ''}
            </div>
          </div>
        </div>

        <!-- Right: Actions & Stats -->
        <div style="display: flex; flex-direction: column; justify-content: space-between;">
          <div style="color: var(--color-text-tertiary); font-size: 0.9rem; line-height: 1.5;">
            <p><strong>WorkNest EOS Agent</strong> is tracking your productive time and activities. Status updates are synchronized every 30 seconds.</p>
          </div>
          
          <button id="clock-btn" class="time-tracker-btn ${isClockedIn ? 'time-tracker-btn-clockout' : 'time-tracker-btn-clockin'}">
             <span class="nav-icon" style="width: 20px;">${isClockedIn ? Icons.logout : Icons.plus}</span>
             ${isClockedIn ? "Finish Day & Clock Out" : "Start Shift & Clock In"}
          </button>
        </div>
      </div>

      <!-- Activity Grid (Only visible when clocked in) -->
      ${isClockedIn ? `
        <div class="time-tracker-activity-card">
          <div class="time-tracker-activity-header">
            <div class="time-tracker-activity-title">
              <span class="nav-icon" style="width: 18px;">${Icons.analytics}</span>
              Live Activity Overview
            </div>
            <span style="font-size: 0.75rem; font-weight: 700; color: var(--color-text-tertiary);">AGENT COMPLIANT</span>
          </div>
          <div class="time-tracker-activity-grid">
            <div class="time-tracker-activity-item">
              <div class="time-tracker-activity-icon">
                 <svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z"/></svg>
              </div>
              <div>
                <p class="time-tracker-activity-label">Mouse Events</p>
                <p class="time-tracker-activity-value">${data.mouseEvents.toLocaleString()}</p>
              </div>
            </div>
            <div class="time-tracker-activity-item">
              <div class="time-tracker-activity-icon">
                <svg style="width:16px;height:16px" viewBox="0 0 24 24"><path fill="currentColor" d="M21,17H3V5H21M21,3H3A2,2 0 0,0 1,5V17A2,2 0 0,0 3,19H21A2,2 0 0,0 23,17V5A2,2 0 0,0 21,3M5,7H7V9H5M5,10H7V12H5M8,7H10V9H8M8,10H10V12H8M11,7H13V9H11M11,10H13V12H11M14,7H16V9H14M14,10H16V12H14M17,7H19V9H17M17,10H19V12H17M8,13H16V15H8V13Z"/></svg>
              </div>
              <div>
                <p class="time-tracker-activity-label">Keyboard Events</p>
                <p class="time-tracker-activity-value">${data.keyboardEvents.toLocaleString()}</p>
              </div>
            </div>
            <div class="time-tracker-activity-item">
              <div class="time-tracker-activity-icon">
                <span class="nav-icon" style="width: 16px;">${Icons.clock}</span>
              </div>
              <div>
                <p class="time-tracker-activity-label">Active Time</p>
                <p class="time-tracker-activity-value" style="color: #10b981;">${Math.floor(data.activeTime / 60)}m ${data.activeTime % 60}s</p>
              </div>
            </div>
            <div class="time-tracker-activity-item">
              <div class="time-tracker-activity-icon">
                <span class="nav-icon" style="width: 16px; opacity:0.5;">${Icons.clock}</span>
              </div>
              <div>
                <p class="time-tracker-activity-label">Idle Time</p>
                <p class="time-tracker-activity-value" style="color: #f59e0b;">${Math.floor(data.idleTime / 60)}m</p>
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <div class="time-tracker-footer-info">
        ${isClockedIn ? `✨ LIVE FEEDBACK ENABLED • DESKTOP AGENT CONNECTED` : `READY TO COMMENCE WORK SHIFT? CLOCK IN TO START TRACKING.`}
      </div>
    </div>
  `;
}

function renderLeaveRequests() {
  return ['Alex Thompson - Feb 5-7', 'Maria Garcia - Feb 10-11'].map(req => `
    <div style="padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 12px; display: flex; justify-content: space-between;">
      <span>${req}</span>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-success" style="padding: 6px 12px; font-size: 0.8rem;">Approve</button>
        <button class="btn btn-danger" style="padding: 6px 12px; font-size: 0.8rem;">Decline</button>
      </div>
    </div>
  `).join('');
}

function renderPerformanceBars() {
  return [
    { name: 'Elite', count: 8, color: '#0b0b0d' },
    { name: 'High', count: 15, color: '#1f2126' },
    { name: 'Standard', count: 18, color: '#3d3f45' }
  ].map(tier => `
    <div style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <span>${tier.name}</span><strong>${tier.count}</strong>
      </div>
      <div style="width: 100%; height: 8px; background: rgba(255,255,255,0.05); border-radius: 4px;">
        <div style="width: ${tier.count * 2}%; height: 100%; background: ${tier.color}; border-radius: 4px;"></div>
      </div>
    </div>
  `).join('');
}

function renderTasksOverview() {
  return [
    { status: 'To Do', count: 12, color: '#64748b' },
    { status: 'In Progress', count: 8, color: '#3b82f6' },
    { status: 'Completed', count: 22, color: '#10b981' }
  ].map(s => `
    <div style="display: flex; justify-content: space-between; padding: 12px; background: ${s.color}11; border-radius: 8px; margin-bottom: 8px; border-left: 3px solid ${s.color};">
      <span>${s.status}</span><strong style="color: ${s.color};">${s.count}</strong>
    </div>
  `).join('');
}

function renderTeamStatus() {
  return [
    { name: 'Sarah J.', status: 'active', tier: '#10b981' },
    { name: 'Michael C.', status: 'active', tier: '#3b82f6' },
    { name: 'Emma D.', status: 'inactive', tier: '#f59e0b' }
  ].map(m => `
    <div style="display: flex; justify-content: space-between; padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 8px;">
      <span>${m.name}</span>
      <div style="display: flex; gap: 8px;">
        <span style="font-size: 0.7rem; padding: 4px 8px; background: ${m.status === 'active' ? '#10b981' : '#ef4444'}22; color: ${m.status === 'active' ? '#10b981' : '#ef4444'}; border-radius: 4px;">${m.status.toUpperCase()}</span>
        <span style="width: 12px; height: 12px; border-radius: 50%; background: ${m.tier};"></span>
      </div>
    </div>
  `).join('');
}

function renderEmployeeTasks() {
  return [
    { title: 'Marketing Analysis', status: 'in-progress', priority: 'high', due: '2026-02-01' },
    { title: 'Campaign Metrics', status: 'pending', priority: 'medium', due: '2026-02-02' }
  ].map(task => `
    <div class="task-card" style="margin-bottom: 12px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 12px;">
        <div>
          <div style="font-weight: 600; font-size: 1.1rem;">${task.title}</div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <span style="font-size: 0.75rem; padding: 4px 8px; background: ${task.priority === 'high' ? '#ef4444' : '#f59e0b'}22; color: ${task.priority === 'high' ? '#ef4444' : '#f59e0b'}; border-radius: 4px;">${task.priority.toUpperCase()}</span>
            <span style="color: var(--color-text-tertiary); font-size: 0.85rem;">Due ${formatDate(task.due)}</span>
          </div>
        </div>
        <span class="task-status status-${task.status}">${task.status.replace('-', ' ')}</span>
      </div>
      <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Update Progress</button>
    </div>
  `).join('');
}

// ==================== View: Tasks ====================

function renderTasksView() {
  const role = AppState.currentUser?.role;
  return `
    <div class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
        <h1>Task Management</h1>
        <button class="btn btn-primary" id="create-task-btn"><span class="nav-icon" style="width: 16px;">${Icons.plus}</span>Create Task</button>
      </div>
      
      <div class="glass-card">
        <div style="display: flex; gap: 16px; margin-bottom: 24px;">
          <button class="btn btn-ghost" data-filter="all">All</button>
          <button class="btn btn-ghost" data-filter="pending">Pending</button>
          <button class="btn btn-ghost" data-filter="in-progress">In Progress</button>
          <button class="btn btn-ghost" data-filter="review">Review</button>
          <button class="btn btn-ghost" data-filter="completed">Completed</button>
        </div>
        ${renderTasksList(role)}
      </div>
    </div>
  `;
}

function renderTasksList(role) {
  const tasks = [
    { id: 1, title: 'Social Media Campaign', assignee: 'Sarah Johnson', status: 'in-progress', priority: 'high', progress: 65 },
    { id: 2, title: 'Client Documentation', assignee: 'Alex Chen', status: 'review', priority: 'high', progress: 90 },
    { id: 3, title: 'Analytics Dashboard', assignee: 'You', status: 'pending', priority: 'medium', progress: 0 },
    { id: 4, title: 'Content Creation', assignee: 'Michael Brown', status: 'completed', priority: 'medium', progress: 100 }
  ];
  
  return tasks.map(task => `
    <div class="task-card" style="margin-bottom: 16px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
        <div style="flex: 1;">
          <h4 style="margin-bottom: 8px;">${task.title}</h4>
          <div style="display: flex; gap: 12px; font-size: 0.85rem; color: var(--color-text-tertiary);">
            <span>Assigned to: <strong style="color: var(--color-text-secondary);">${task.assignee}</strong></span>
            <span>Priority: <strong style="color: ${task.priority === 'high' ? '#ef4444' : '#f59e0b'};">${task.priority}</strong></span>
          </div>
        </div>
        <span class="task-status status-${task.status}">${task.status.replace('-', ' ')}</span>
      </div>
      
      <div style="margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
          <span>Progress</span><strong>${task.progress}%</strong>
        </div>
        <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.05); border-radius: 4px; overflow: hidden;">
          <div style="width: ${task.progress}%; height: 100%; background: linear-gradient(90deg, #0b0b0d, #3d3f45); border-radius: 4px; transition: width 0.3s;"></div>
        </div>
      </div>
      
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">View Details</button>
        ${task.status === 'review' && role !== 'employee' ? '<button class="btn btn-success" style="padding: 8px 16px; font-size: 0.85rem;">Approve</button>' : ''}
        ${task.status !== 'completed' ? '<button class="btn btn-ghost" style="padding: 8px 16px; font-size: 0.85rem;">Update</button>' : ''}
      </div>
    </div>
  `).join('');
}

// ==================== View: Projects (CEO) ====================

function renderProjectsView() {
  return `
    <div class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
        <div>
          <h1>Project Management</h1>
          <p style="color: var(--color-text-tertiary); margin-top: 8px;">Manage projects, milestones, and deliverables</p>
        </div>
        <button class="btn btn-primary" id="create-project-btn"><span class="nav-icon" style="width: 16px;">${Icons.plus}</span>Create Project</button>
      </div>
      
      <!-- Stats Summary -->
      <div class="stats-grid" style="grid-template-columns: repeat(5, 1fr); margin-bottom: 32px;">
        <div class="stat-card glass-card">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 40px; height: 40px; background: rgba(99,102,241,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span class="nav-icon" style="color: #6366f1; width: 20px;">${Icons.tasks}</span>
            </div>
            <div>
              <p class="stat-value" style="font-size: 1.75rem;">18</p>
              <p class="stat-label" style="font-size: 0.8rem;">Total Projects</p>
            </div>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 40px; height: 40px; background: rgba(59,130,246,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span class="nav-icon" style="color: #3b82f6; width: 20px;">${Icons.clock}</span>
            </div>
            <div>
              <p class="stat-value" style="font-size: 1.75rem;">12</p>
              <p class="stat-label" style="font-size: 0.8rem;">Active</p>
            </div>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 40px; height: 40px; background: rgba(16,185,129,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span class="nav-icon" style="color: #10b981; width: 20px;">${Icons.checkCircle}</span>
            </div>
            <div>
              <p class="stat-value" style="font-size: 1.75rem;">5</p>
              <p class="stat-label" style="font-size: 0.8rem;">Completed</p>
            </div>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 40px; height: 40px; background: rgba(245,158,11,0.2); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span class="nav-icon" style="color: #f59e0b; width: 20px;">${Icons.clock}</span>
            </div>
            <div>
              <p class="stat-value" style="font-size: 1.75rem;">1</p>
              <p class="stat-label" style="font-size: 0.8rem;">Pending Approval</p>
            </div>
          </div>
        </div>
        <div class="stat-card glass-card">
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 40px; height: 40px; background: rgba(11,11,13,0.08); border-radius: 8px; display: flex; align-items: center; justify-content: center;">
              <span style="font-size: 1.25rem; font-weight: 700; color: #0b0b0d;">$</span>
            </div>
            <div>
              <p class="stat-value" style="font-size: 1.75rem;">$2.4M</p>
              <p class="stat-label" style="font-size: 0.8rem;">Total Value</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Filters -->
      <div style="display: flex; gap: 16px; margin-bottom: 24px;">
        <div style="flex: 1; position: relative;">
          <input type="text" class="form-input" placeholder="Search projects by name..." />
        </div>
        <select class="form-input" style="width: 180px;">
          <option value="all">All Status</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="on_hold">On Hold</option>
        </select>
        <select class="form-input" style="width: 180px;">
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      
      <!-- Projects List -->
      ${renderProjectsList()}
    </div>
  `;
}

function renderProjectsList() {
  const projects = [
    { name: 'Enterprise CRM System', client: 'TechCorp Inc.', teamLead: 'Sarah Johnson', status: 'in_progress', priority: 'high', progress: 68, budget: '$450K', contract: '$520K', start: '2026-01-15', due: '2026-04-30', docs: 12 },
    { name: 'Mobile Banking App', client: 'FinanceHub', teamLead: 'Michael Chen', status: 'in_progress', priority: 'critical', progress: 45, budget: '$380K', contract: '$425K', start: '2026-01-20', due: '2026-05-15', docs: 8 },
    { name: 'E-Commerce Platform', client: 'RetailPro', teamLead: 'Emma Davis', status: 'requirement_gathering', priority: 'medium', progress: 15, budget: '$290K', contract: '$320K', start: '2026-01-25', due: '2026-06-30', docs: 5 },
    { name: 'Healthcare Portal', client: 'MediCare Plus', teamLead: 'James Wilson', status: 'completed', priority: 'high', progress: 100, budget: '$350K', contract: '$380K', start: '2025-10-01', due: '2026-01-15', docs: 24 }
  ];
  
  const statusColors = {
    in_progress: { bg: 'rgba(59,130,246,0.1)', text: '#3b82f6', label: 'In Progress' },
    completed: { bg: 'rgba(16,185,129,0.1)', text: '#10b981', label: 'Completed' },
    requirement_gathering: { bg: 'rgba(139,92,246,0.1)', text: '#8b5cf6', label: 'Requirement Gathering' },
    on_hold: { bg: 'rgba(100,116,139,0.1)', text: '#64748b', label: 'On Hold' }
  };
  
  const priorityColors = { critical: '#dc2626', high: '#ef4444', medium: '#f59e0b', low: '#3b82f6' };
  
  return `
    <div style="display: grid; gap: 24px;">
      ${projects.map(project => {
        const statusInfo = statusColors[project.status] || statusColors.in_progress;
        return `
          <div class="glass-card" style="border-top: 4px solid ${priorityColors[project.priority]};">
            <!-- Header -->
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
              <div style="flex: 1;">
                <h3 style="margin-bottom: 8px;">${project.name}</h3>
                <div style="display: flex; align-items: center; gap: 8px; color: var(--color-text-tertiary); font-size: 0.9rem;">
                  <span class="nav-icon" style="width: 14px; height: 14px;">${Icons.users}</span>
                  <span>${project.client}</span>
                </div>
              </div>
              <div style="display: flex; gap: 8px; align-items: center;">
                <span style="padding: 6px 12px; background: ${statusInfo.bg}; color: ${statusInfo.text}; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">
                  ${statusInfo.label}
                </span>
                <span style="padding: 6px 12px; background: ${priorityColors[project.priority]}22; color: ${priorityColors[project.priority]}; border-radius: 6px; font-size: 0.8rem; font-weight: 600; text-transform: uppercase;">
                  ${project.priority}
                </span>
              </div>
            </div>
            
            <!-- Progress -->
            <div style="margin: 20px 0;">
              <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
                <span style="color: var(--color-text-tertiary);">Progress</span>
                <strong style="color: var(--color-text-primary);">${project.progress}%</strong>
              </div>
              <div style="width: 100%; height: 8px; background: rgba(0,0,0,0.05); border-radius: 4px; overflow: hidden;">
                <div style="width: ${project.progress}%; height: 100%; background: linear-gradient(90deg, #0b0b0d, #3d3f45); border-radius: 4px; transition: width 0.3s;"></div>
              </div>
            </div>
            
            <!-- Info Grid -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 20px 0; padding: 16px; background: rgba(255,255,255,0.02); border-radius: 8px;">
              <div>
                <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text-tertiary); font-size: 0.8rem; margin-bottom: 4px;">
                  <span class="nav-icon" style="width: 14px;">${Icons.users}</span>
                  <span>Team Lead</span>
                </div>
                <div style="font-weight: 600; font-size: 0.9rem;">${project.teamLead}</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text-tertiary); font-size: 0.8rem; margin-bottom: 4px;">
                  <span class="nav-icon" style="width: 14px;">${Icons.notes}</span>
                  <span>Documents</span>
                </div>
                <div style="font-weight: 600; font-size: 0.9rem;">${project.docs} files</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text-tertiary); font-size: 0.8rem; margin-bottom: 4px;">
                  <span>💰</span>
                  <span>Budget</span>
                </div>
                <div style="font-weight: 600; font-size: 0.9rem;">${project.budget}</div>
              </div>
              <div>
                <div style="display: flex; align-items: center; gap: 6px; color: var(--color-text-tertiary); font-size: 0.8rem; margin-bottom: 4px;">
                  <span>📈</span>
                  <span>Contract Value</span>
                </div>
                <div style="font-weight: 600; font-size: 0.9rem; color: #10b981;">${project.contract}</div>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.05);">
              <div style="display: flex; gap: 20px; color: var(--color-text-tertiary); font-size: 0.85rem;">
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="nav-icon" style="width: 14px;">${Icons.calendar}</span>
                  <span>Start: ${formatDate(project.start)}</span>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <span class="nav-icon" style="width: 14px;">${Icons.clock}</span>
                  <span>Due: ${formatDate(project.due)}</span>
                </div>
              </div>
              <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">View Details</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

// ==================== View: Leave Management ====================

function renderLeavesView() {
  const role = AppState.currentUser?.role;
  return `
    <div class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
        <h1>Leave Management</h1>
        ${role === 'employee' || role === 'team_lead' ? '<button class="btn btn-primary" id="apply-leave-btn"><span class="nav-icon" style="width: 16px;">${Icons.plus}</span>Apply for Leave</button>' : ''}
      </div>
      
      ${role === 'employee' ? renderEmployeeLeaveBalance() : ''}
      
      <div class="glass-card" style="margin-top: 24px;">
        <h3 style="margin-bottom: 24px;">${role === 'admin' ? 'All Leave Requests' : role === 'team_lead' ? 'Team Leave Requests' : 'My Leave History'}</h3>
        ${renderLeaveList(role)}
      </div>
    </div>
  `;
}

function renderEmployeeLeaveBalance() {
  return `
    <div class="stats-grid" style="grid-template-columns: repeat(4, 1fr);">
      <div class="stat-card glass-card">
        <span class="stat-label">Total Leave</span>
        <div class="stat-value" style="font-size: 2rem;">24</div>
      </div>
      <div class="stat-card glass-card">
        <span class="stat-label">Used</span>
        <div class="stat-value" style="font-size: 2rem; color: #ef4444;">8</div>
      </div>
      <div class="stat-card glass-card">
        <span class="stat-label">Remaining</span>
        <div class="stat-value" style="font-size: 2rem; color: #10b981;">16</div>
      </div>
      <div class="stat-card glass-card">
        <span class="stat-label">Pending</span>
        <div class="stat-value" style="font-size: 2rem; color: #f59e0b;">2</div>
      </div>
    </div>
  `;
}

function renderLeaveList(role) {
  const leaves = [
    { employee: 'Alex Thompson', dates: 'Feb 5-7, 2026', days: 3, reason: 'Personal', status: 'pending' },
    { employee: 'Maria Garcia', dates: 'Feb 10-11, 2026', days: 2, reason: 'Medical', status: 'pending' },
    { employee: 'You', dates: 'Jan 15-16, 2026', days: 2, reason: 'Family', status: 'approved' },
    { employee: 'David Kim', dates: 'Jan 10, 2026', days: 1, reason: 'Emergency', status: 'approved' }
  ];
  
  return leaves.map(leave => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 20px; background: rgba(255,255,255,0.03); border-radius: 12px; margin-bottom: 12px; border-left: 4px solid ${leave.status === 'pending' ? '#f59e0b' : leave.status === 'approved' ? '#10b981' : '#ef4444'};">
      <div style="flex: 1;">
        <div style="font-weight: 600; font-size: 1.05rem; margin-bottom: 8px;">${role === 'employee' ? leave.dates : leave.employee}</div>
        <div style="display: flex; gap: 16px; color: var(--color-text-tertiary); font-size: 0.9rem;">
          <span>${leave.dates}</span>
          <span>•</span>
          <span>${leave.days} day${leave.days > 1 ? 's' : ''}</span>
          <span>•</span>
          <span>${leave.reason}</span>
        </div>
      </div>
      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="padding: 8px 16px; background: ${leave.status === 'pending' ? '#f59e0b' : leave.status === 'approved' ? '#10b981' : '#ef4444'}22; color: ${leave.status === 'pending' ? '#f59e0b' : leave.status === 'approved' ? '#10b981' : '#ef4444'}; border-radius: 8px; font-weight: 600; text-transform: uppercase; font-size: 0.85rem;">
          ${leave.status}
        </span>
        ${leave.status === 'pending' && role === 'admin' ? `
          <button class="btn btn-success" style="padding: 8px 16px; font-size: 0.85rem;">Approve</button>
          <button class="btn btn-danger" style="padding: 8px 16px; font-size: 0.85rem;">Decline</button>
        ` : ''}
      </div>
    </div>
  `).join('');
}

// ==================== View: Messages ====================

function renderMessagesView() {
  return `
    <div class="main-content">
      <h1 style="margin-bottom: 32px;">Messages</h1>
      
      <div class="glass-card" style="display: grid; grid-template-columns: 320px 1fr; height: calc(100vh - 200px); gap: 0;">
        <div style="border-right: 1px solid rgba(255,255,255,0.1); padding: 24px;">
          <input type="text" class="form-input" placeholder="Search conversations..." style="margin-bottom: 16px;" />
          ${renderConversationList()}
        </div>
        
        <div style="display: flex; flex-direction: column;">
          <div style="padding: 24px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <h3>Marketing Team</h3>
            <p style="color: var(--color-text-tertiary); font-size: 0.9rem;">5 members • 3 active</p>
          </div>
          
          <div style="flex: 1; padding: 24px; overflow-y: auto;">
            ${renderMessages()}
          </div>
          
          <div style="padding: 24px; border-top: 1px solid rgba(255,255,255,0.1);">
            <form id="message-form" style="display: flex; gap: 12px;">
              <input type="text" class="form-input" placeholder="Type a message..." style="flex: 1;" />
              <button type="submit" class="btn btn-primary"><span class="nav-icon" style="width: 18px;">${Icons.send}</span></button>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Clock In/Out Events (assuming this logic is meant to be called after rendering the main layout)
// This block should ideally be in a setup function that runs after the initial render,
// or within the main `render` function if it handles all event bindings.
// For the purpose of this edit, it's placed as per the instruction's relative position.
// Note: The `render()` call inside the setInterval will cause a full re-render every second,
// which might be inefficient for a real application. A more optimized approach would be
// to update only the relevant UI elements.
function setupTimeTrackerEvents() {
  const clockBtn = document.getElementById('clock-btn');
  if (clockBtn) {
    clockBtn.addEventListener('click', () => {
      AppState.isClockedIn = !AppState.isClockedIn;
      if (AppState.isClockedIn) {
        AppState.clockInData.startTime = Date.now();
        showNotification('Shift started. Activity tracking is active.', 'success');
        
        // Start live simulator
        window.clockTimer = setInterval(() => {
          if (AppState.isClockedIn) {
            AppState.clockInData.activeTime += 1;
            AppState.clockInData.mouseEvents += Math.floor(Math.random() * 5);
            AppState.clockInData.keyboardEvents += Math.floor(Math.random() * 3);
            AppState.clockInData.todayHours += 1/3600;
            render(); // Refresh UI to show live updates
          }
        }, 1000);
      } else {
        clearInterval(window.clockTimer);
        showNotification('Shift ended. Time log saved.', 'info');
      }
      render();
    });
  }
}

function renderConversationList() {
  const convos = [
    { name: 'Marketing Team', lastMsg: 'Great work on the campaign!', time: '2m ago', unread: 3, active: true },
    { name: 'Sarah Johnson', lastMsg: 'Can you review this?', time: '1h ago', unread: 1, active: false },
    { name: 'Project Alpha', lastMsg: 'Meeting at 3pm', time: '3h ago', unread: 0, active: false }
  ];
  
  return convos.map(c => `
    <div style="padding: 16px; background: ${c.active ? 'rgba(11,11,13,0.06)' : 'transparent'}; border-radius: 8px; margin-bottom: 8px; cursor: pointer; border-left: ${c.active ? '3px solid #0b0b0d' : '3px solid transparent'}; border: 1px solid ${c.active ? 'rgba(11,11,13,0.1)' : 'transparent'};">
      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
        <strong style="color: var(--color-text-primary);">${c.name}</strong>
        ${c.unread > 0 ? `<span style="background: #0b0b0d; color: white; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; font-weight: 600;">${c.unread}</span>` : ''}
      </div>
      <div style="font-size: 0.85rem; color: var(--color-text-tertiary); display: flex; justify-content: space-between;">
        <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${c.lastMsg}</span>
        <span style="margin-left: 8px;">${c.time}</span>
      </div>
    </div>
  `).join('');
}

function renderMessages() {
  const msgs = [
    { sender: 'Sarah Johnson', text: 'Hey team, great progress on the Q1 campaign!', time: '10:30 AM', isMe: false },
    { sender: 'You', text: 'Thanks! The analytics are looking strong.', time: '10:32 AM', isMe: true },
    { sender: 'Michael Chen', text: 'Should we schedule a review meeting?', time: '10:35 AM', isMe: false }
  ];
  
  return msgs.map(msg => `
    <div style="display: flex; ${msg.isMe ? 'justify-content: flex-end' : 'justify-content: flex-start'}; margin-bottom: 16px;">
      <div style="max-width: 60%; ${msg.isMe ? 'background: linear-gradient(135deg, #0b0b0d, #2d2f35); color: #ffffff;' : 'background: rgba(11,11,13,0.05); color: var(--color-text-primary); border: 1px solid rgba(11,11,13,0.1);'} padding: 12px 16px; border-radius: 12px;">
        ${!msg.isMe ? `<div style="font-weight: 700; font-size: 0.8rem; margin-bottom: 4px; color: #0b0b0d; text-transform: uppercase;">${msg.sender}</div>` : ''}
        <div style="font-size: 0.95rem;">${msg.text}</div>
        <div style="font-size: 0.75rem; color: ${msg.isMe ? 'rgba(255,255,255,0.7)' : 'var(--color-text-muted)'}; margin-top: 4px; text-align: right;">${msg.time}</div>
      </div>
    </div>
  `).join('');
}

// ==================== View: Notes ====================

function renderNotesView() {
  return `
    <div class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
        <h1>Notes & Documentation</h1>
        <button class="btn btn-primary" id="create-note-btn"><span class="nav-icon" style="width: 16px;">${Icons.plus}</span>New Note</button>
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px;">
        ${renderNoteCards()}
      </div>
    </div>
  `;
}

function renderNoteCards() {
  const notes = [
    { title: 'Brand Guidelines 2026', category: 'Documentation', updated: '2026-01-28', color: '#0b0b0d' },
    { title: 'Q1 Marketing Strategy', category: 'Planning', updated: '2026-01-27', color: '#1f2126' },
    { title: 'Team Meeting Notes', category: 'Meetings', updated: '2026-01-25', color: '#3d3f45' },
    { title: 'Client Feedback Summary', category: 'Research', updated: '2026-01-24', color: '#64748b' }
  ];
  
  return notes.map(note => `
    <div class="glass-card" style="cursor: pointer; border-top: 4px solid ${note.color};">
      <span style="font-size: 0.75rem; padding: 4px 12px; background: ${note.color}22; color: ${note.color}; border-radius: 4px; text-transform: uppercase; font-weight: 600;">${note.category}</span>
      <h3 style="margin: 16px 0;">${note.title}</h3>
      <p style="color: var(--color-text-tertiary); font-size: 0.9rem;">Last updated ${formatDate(note.updated)}</p>
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <button class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">Open</button>
        <button class="btn btn-ghost" style="padding: 8px 16px; font-size: 0.85rem;">Share</button>
      </div>
    </div>
  `).join('');
}

// ==================== View: Analytics (CEO/Admin) ====================

function renderAnalyticsView() {
  return `
    <div class="main-content">
      <h1 style="margin-bottom: 32px;">Analytics & Insights</h1>
      
      <div class="stats-grid">
        <div class="stat-card glass-card"><span class="stat-label">Total Revenue</span><div class="stat-value">$482K</div><div class="stat-trend trend-up"><span class="nav-icon" style="width: 14px;">${Icons.trendUp}</span><span>+15%</span></div></div>
        <div class="stat-card glass-card"><span class="stat-label">Projects</span><div class="stat-value">24</div><div class="stat-trend trend-up"><span class="nav-icon" style="width: 14px;">${Icons.trendUp}</span><span>+4</span></div></div>
        <div class="stat-card glass-card"><span class="stat-label">Client Satisfaction</span><div class="stat-value">94%</div><div class="stat-trend trend-up"><span class="nav-icon" style="width: 14px;">${Icons.trendUp}</span><span>+2%</span></div></div>
        <div class="stat-card glass-card"><span class="stat-label">Productivity</span><div class="stat-value">87%</div><div class="stat-trend trend-up"><span class="nav-icon" style="width: 14px;">${Icons.trendUp}</span><span>+5%</span></div></div>
      </div>
      
      <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 32px;">
        <div class="glass-card">
          <h3 style="margin-bottom: 24px;">Performance Trends</h3>
          <div style="height: 300px; display: flex; align-items: flex-end; gap: 12px;">
            ${[65, 72, 68, 78, 82, 75, 88, 85, 90].map((val, i) => `
              <div style="flex: 1; height: ${val}%; background: linear-gradient(180deg, #0b0b0d, #3d3f45); border-radius: 4px 4px 0 0; position: relative; opacity: ${0.5 + (i * 0.05)};">
                <span style="position: absolute; top: -24px; left: 0; right: 0; text-align: center; font-size: 0.75rem; color: var(--color-text-primary); font-weight: 700;">${val}%</span>
              </div>
            `).join('')}
          </div>
          <div style="display: flex; justify-content: space-around; margin-top: 16px; color: var(--color-text-tertiary); font-size: 0.85rem;">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span>
          </div>
        </div>
        
        <div class="glass-card">
          <h3 style="margin-bottom: 24px;">Top Performers</h3>
          ${renderTopPerformers()}
        </div>
      </div>
    </div>
  `;
}

function renderTopPerformers() {
  return [
    { name: 'Sarah Johnson', score: 9.4, tier: '#ffd700' },
    { name: 'Michael Chen', score: 9.1, tier: '#ffd700' },
    { name: 'Emma Davis', score: 8.8, tier: '#10b981' }
  ].map((p, i) => `
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background: rgba(255,255,255,0.03); border-radius: 8px; margin-bottom: 12px;">
      <div style="display: flex; gap: 12px; align-items: center;">
        <span style="font-weight: 700; font-size: 1.2rem; color: var(--color-text-tertiary);">#${i + 1}</span>
        <div>
          <div style="font-weight: 600;">${p.name}</div>
          <div style="font-size: 0.85rem; color: var(--color-text-tertiary);">Score: ${p.score}</div>
        </div>
      </div>
      <span style="width: 16px; height: 16px; border-radius: 50%; background: ${p.tier};"></span>
    </div>
  `).join('');
}

// ==================== View: Team Management ====================

function renderTeamView() {
  const role = AppState.currentUser?.role;
  return `
    <div class="main-content">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px;">
        <h1>Team Management</h1>
        ${role === 'admin' ? '<button class="btn btn-primary"><span class="nav-icon" style="width: 16px;">${Icons.plus}</span>Add Member</button>' : ''}
      </div>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
        ${renderTeamMembers(role)}
      </div>
    </div>
  `;
}

function renderTeamMembers(role) {
  const members = [
    { name: 'Sarah Johnson', role: 'Team Lead', status: 'active', tier: 'elite', tasks: 8, performance: 9.4 },
    { name: 'Michael Chen', role: 'Senior Developer', status: 'active', tier: 'high', tasks: 12, performance: 8.9 },
    { name: 'Emma Davis', role: 'Marketing Specialist', status: 'active', tier: 'standard', tasks: 6, performance: 8.2 },
    { name: 'James Wilson', role: 'Designer', status: 'inactive', tier: 'support', tasks: 4, performance: 7.5 }
  ];
  
  const tierColors = { elite: '#ffd700', high: '#10b981', standard: '#3b82f6', support: '#f59e0b' };
  
  return members.map(m => `
    <div class="glass-card">
      <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 16px;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.5rem;">
          ${m.name.split(' ').map(n => n[0]).join('')}
        </div>
        <span style="padding: 6px 12px; background: ${m.status === 'active' ? '#10b981' : '#64748b'}22; color: ${m.status === 'active' ? '#10b981' : '#64748b'}; border-radius: 4px; font-size: 0.75rem; text-transform: uppercase; font-weight: 600;">
          ${m.status}
        </span>
      </div>
      
      <h3 style="margin-bottom: 4px;">${m.name}</h3>
      <p style="color: var(--color-text-tertiary); font-size: 0.9rem; margin-bottom: 16px;">${m.role}</p>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        <div style="padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary-light);">${m.tasks}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-tertiary);">Active Tasks</div>
        </div>
        <div style="padding: 12px; background: rgba(255,255,255,0.03); border-radius: 8px; text-align: center;">
          <div style="font-size: 1.5rem; font-weight: 700; color: ${tierColors[m.tier]};">${m.performance}</div>
          <div style="font-size: 0.75rem; color: var(--color-text-tertiary);">Score</div>
        </div>
      </div>
      
      <div style="padding: 8px 12px; background: ${tierColors[m.tier]}22; border-radius: 8px; text-align: center; border-left: 3px solid ${tierColors[m.tier]};">
        <strong style="color: ${tierColors[m.tier]}; text-transform: uppercase; font-size: 0.85rem;">${m.tier} Tier</strong>
      </div>
      
      <div style="margin-top: 16px; display: flex; gap: 8px;">
        <button class="btn btn-primary" style="flex: 1; padding: 8px; font-size: 0.85rem;">View Profile</button>
        <button class="btn btn-ghost" style="flex: 1; padding: 8px; font-size: 0.85rem;">Assign Task</button>
      </div>
    </div>
  `).join('');
}

// ==================== Main Render ====================

function render() {
  const app = document.getElementById('app');
  
  if (!AppState.isAuthenticated) {
    app.innerHTML = renderLoginScreen();
    attachLoginHandlers();
    return;
  }
  
  const role = AppState.currentUser?.role || 'employee';
  let content = '';
  
  switch(AppState.currentView) {
    case 'tasks': content = renderTasksView(); break;
    case 'leaves': content = renderLeavesView(); break;
    case 'messages': content = renderMessagesView(); break;
    case 'notes': content = renderNotesView(); break;
    case 'attendance': content = renderAttendanceView(); break;
    case 'analytics': content = renderAnalyticsView(); break;
    case 'team': content = renderTeamView(); break;
    default: content = renderDashboardView();
  }
  
  app.innerHTML = `<div class="app-container">${renderSidebar(role)}${content}</div>`;
  attachDashboardHandlers();
}

// ==================== Event Handlers ====================

function attachLoginHandlers() {
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    let role = 'employee', name = 'Demo User';
    
    if (email.includes('ceo')) { role = 'admin'; name = 'John Anderson'; }
    else if (email.includes('lead')) { role = 'team_lead'; name = 'Sarah Mitchell'; }
    else { name = 'Alex Johnson'; }
    
    AppState.currentUser = { email, role, name };
    AppState.isAuthenticated = true;
    AppState.currentView = 'dashboard';
    
    showNotification(`Welcome back, ${name}!`, 'success');
    render();
  });
}

function attachDashboardHandlers() {
  document.querySelectorAll('.nav-item[data-view]').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      AppState.currentView = item.getAttribute('data-view');
      render();
    });
  });
  
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      AppState.isAuthenticated = false;
      AppState.currentUser = null;
      AppState.currentView = 'login';
      showNotification('Logged out successfully', 'success');
      render();
    });
  }
  
  // Message form
  const msgForm = document.getElementById('message-form');
  if (msgForm) {
    msgForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showNotification('Message sent!', 'success');
      e.target.reset();
    });
  }
  
  // Time Tracker Events
  setupTimeTrackerEvents();
}

// ==================== Initialize ====================

document.addEventListener('DOMContentLoaded', () => {
  render();
});
