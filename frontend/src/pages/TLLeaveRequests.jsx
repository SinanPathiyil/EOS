import { useState, useEffect } from 'react';
import { Eye, Users, Filter, Search, Clock, CheckCircle, XCircle, AlertCircle, Calendar } from 'lucide-react';
import Layout from '../components/common/Layout';
import axios from 'axios';

export default function TLLeaveRequests() {
  const [loading, setLoading] = useState(true);
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    loadTeamRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [requests, statusFilter, searchTerm]);

  const loadTeamRequests = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/team-lead/leave/team-requests`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setRequests(response.data.requests || []);
    } catch (error) {
      console.error('Failed to load team requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(req => req.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(req =>
        req.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.leave_type_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.request_number.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: { bg: '#fef3c7', text: '#92400e', icon: Clock },
      approved: { bg: '#d1fae5', text: '#065f46', icon: CheckCircle },
      rejected: { bg: '#fee2e2', text: '#991b1b', icon: XCircle },
      cancelled: { bg: '#f3f4f6', text: '#4b5563', icon: AlertCircle }
    };

    const config = styles[status] || styles.pending;
    const Icon = config.icon;

    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        backgroundColor: config.bg,
        color: config.text,
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: '500'
      }}>
        <Icon className="w-4 h-4" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <Layout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div className="spinner"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{ padding: '2rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '1.875rem', fontWeight: '700', margin: '0 0 0.5rem 0' }}>
              Team Leave Requests
            </h1>
            <p style={{ color: '#6b7280', margin: 0 }}>
              View your team members' leave requests (Read-only)
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#dbeafe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Users className="w-6 h-6" style={{ color: '#3b82f6' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Total Requests</p>
                <p style={{ fontSize: '2rem', fontWeight: '700', margin: 0, color: '#3b82f6' }}>
                  {requests.length}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#fef3c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Clock className="w-6 h-6" style={{ color: '#f59e0b' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Pending</p>
                <p style={{ fontSize: '2rem', fontWeight: '700', margin: 0, color: '#f59e0b' }}>
                  {requests.filter(r => r.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: '#d1fae5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CheckCircle className="w-6 h-6" style={{ color: '#10b981' }} />
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Approved</p>
                <p style={{ fontSize: '2rem', fontWeight: '700', margin: 0, color: '#10b981' }}>
                  {requests.filter(r => r.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          marginBottom: '2rem'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                <Filter className="w-4 h-4" />
                Filter by Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="ba-form-input"
              >
                <option value="all">All Requests</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                <Search className="w-4 h-4" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search by employee, leave type, or request number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="ba-form-input"
              />
            </div>
          </div>
        </div>

        {/* Leave Requests Table */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden'
        }}>
          {filteredRequests.length === 0 ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
              <Users className="w-16 h-16" style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p style={{ fontSize: '1.125rem', margin: 0 }}>
                {requests.length === 0 ? 'No team leave requests found' : 'No requests match your filters'}
              </p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                  <tr>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Request #
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Employee
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Leave Type
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Dates
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Days
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Status
                    </th>
                    <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: '#374151' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request, index) => (
                    <tr 
                      key={request.id}
                      style={{
                        borderBottom: index < filteredRequests.length - 1 ? '1px solid #e5e7eb' : 'none',
                        backgroundColor: index % 2 === 0 ? 'white' : '#fafafa'
                      }}
                    >
                      <td style={{ padding: '1rem' }}>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', fontWeight: '500' }}>
                          {request.request_number}
                        </span>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          <div style={{ fontWeight: '500' }}>{request.user_name}</div>
                          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{request.user_email}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span
                            style={{
                              width: '10px',
                              height: '10px',
                              borderRadius: '50%',
                              backgroundColor: request.leave_type_color
                            }}
                          />
                          <span style={{ fontWeight: '500' }}>{request.leave_type_name}</span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                        <div>
                          <div>{formatDate(request.start_date)}</div>
                          <div style={{ color: '#6b7280' }}>to {formatDate(request.end_date)}</div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center', fontWeight: '600' }}>
                        {request.total_days}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {getStatusBadge(request.status)}
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <button
                          onClick={() => setSelectedRequest(request)}
                          className="btn btn-secondary"
                          style={{ padding: '0.375rem 0.75rem', fontSize: '0.875rem' }}
                        >
                          <Eye className="w-4 h-4" style={{ marginRight: '0.25rem' }} />
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* View Request Details Modal */}
      {selectedRequest && (
        <div className="ba-modal-overlay" onClick={() => setSelectedRequest(null)}>
          <div className="ba-modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="ba-modal-header">
              <div className="ba-modal-header-content">
                <Calendar className="w-6 h-6" />
                <h2 className="ba-modal-title">Leave Request Details</h2>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="ba-modal-close-btn">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="ba-modal-body">
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Request Number</span>
                  <span style={{ fontFamily: 'monospace', fontWeight: '500' }}>{selectedRequest.request_number}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Employee</span>
                  <span style={{ fontWeight: '500' }}>{selectedRequest.user_name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Email</span>
                  <span>{selectedRequest.user_email}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Status</span>
                  {getStatusBadge(selectedRequest.status)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Leave Type</span>
                  <span style={{ fontWeight: '500' }}>{selectedRequest.leave_type_name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Duration</span>
                  <span style={{ fontWeight: '500' }}>{selectedRequest.total_days} days</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>From</span>
                  <span style={{ fontWeight: '500' }}>{formatDate(selectedRequest.start_date)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>To</span>
                  <span style={{ fontWeight: '500' }}>{formatDate(selectedRequest.end_date)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Applied On</span>
                  <span style={{ fontSize: '0.875rem' }}>{formatDate(selectedRequest.requested_at)}</span>
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
                  Reason
                </label>
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '0.875rem'
                }}>
                  {selectedRequest.reason}
                </div>
              </div>

              {selectedRequest.hr_notes && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem', display: 'block' }}>
                    HR Notes
                  </label>
                  <div style={{
                    padding: '1rem',
                    backgroundColor: selectedRequest.status === 'approved' ? '#d1fae5' : '#fee2e2',
                    borderRadius: '8px',
                    border: `1px solid ${selectedRequest.status === 'approved' ? '#10b981' : '#ef4444'}`,
                    fontSize: '0.875rem'
                  }}>
                    {selectedRequest.hr_notes}
                  </div>
                </div>
              )}

              {selectedRequest.status === 'pending' && (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#fef3c7',
                  border: '1px solid #fbbf24',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  color: '#92400e'
                }}>
                  ℹ️ This request is awaiting HR approval. You can view it but cannot approve/reject.
                </div>
              )}
            </div>

            <div className="ba-modal-footer">
              <button onClick={() => setSelectedRequest(null)} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}