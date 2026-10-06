import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Dashboard() {
  const [incidents, setIncidents] = useState<any[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);

  useEffect(() => {
    socket.on('new_incident', (incident) => {
      setIncidents((prev) => [incident, ...prev]);
    });
  }, []);

  const runAiDiagnosis = async () => {
    const diagnosis = {
      rootCause: "Database request timed out after payment confirmation due to connection pool exhaustion.",
      evidence: "Payment succeeded at timestamp 10:31:17. Order creation failed at 10:31:19.",
      suggestedFix: "Add retry logic with idempotency keys to order creation service."
    };
    setSelectedIncident((prev: any) => ({ ...prev, ai_diagnosis: diagnosis }));
  };

  return (
    <div style={{ background: '#0f172a', color: '#f8fafc', minHeight: '100vh', padding: 30, fontFamily: 'monospace' }}>
      <h2>⚡ REPLAY DEVELOPER DASHBOARD</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginTop: 20 }}>
        <div style={{ background: '#1e293b', padding: 20, borderRadius: 8 }}>
          <h3>Live Incidents ({incidents.length})</h3>
          {incidents.length === 0 && <p style={{ color: '#94a3b8' }}>Listening for failures...</p>}
          {incidents.map((inc) => (
            <div key={inc.id} onClick={() => setSelectedIncident(inc)} style={{ background: '#090d16', padding: 15, marginBottom: 10, cursor: 'pointer', borderLeft: '4px solid #ef4444', borderRadius: 4 }}>
              <h4>🚨 {inc.title}</h4>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>Severity: {inc.severity}</p>
            </div>
          ))}
        </div>
        <div style={{ background: '#1e293b', padding: 20, borderRadius: 8 }}>
          <h3>Incident Inspector & AI Diagnosis</h3>
          {selectedIncident ? (
            <div>
              <h4>Incident: {selectedIncident.title}</h4>
              <p style={{ fontSize: 12, color: '#94a3b8' }}>Session ID: {selectedIncident.session_id}</p>
              <button onClick={runAiDiagnosis} style={{ background: '#3b82f6', color: 'white', padding: '10px 15px', border: 'none', borderRadius: 4, cursor: 'pointer', marginTop: 10 }}>
                🤖 Ask AI Diagnose
              </button>
              {selectedIncident.ai_diagnosis && (
                <div style={{ marginTop: 15, background: '#090d16', padding: 15, borderRadius: 6 }}>
                  <p><strong>Root Cause:</strong> {selectedIncident.ai_diagnosis.rootCause}</p>
                  <p style={{ marginTop: 8 }}><strong>Evidence:</strong> {selectedIncident.ai_diagnosis.evidence}</p>
                  <p style={{ marginTop: 8, color: '#4ade80' }}><strong>Suggested Fix:</strong> {selectedIncident.ai_diagnosis.suggestedFix}</p>
                </div>
              )}
            </div>
          ) : <p style={{ color: '#94a3b8' }}>Select an incident from the left to inspect.</p>}
        </div>
      </div>
    </div>
  );
}