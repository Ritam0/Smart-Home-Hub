import React, { useState, useEffect } from 'react';

const styles = {
  root: {
    fontFamily: 'Roboto, Arial, sans-serif',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
    minHeight: '100vh',
    color: '#fff',
    padding: 0,
    margin: 0,
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: 480,
    margin: '0 auto',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  card: {
    background: 'linear-gradient(135deg, #1a1a1a 0%, #232323 100%)',
    borderRadius: 16,
    boxShadow: '0 2px 16px rgba(0,0,0,0.2)',
    padding: '20px 16px',
    marginBottom: 0,
    border: '1px solid #222',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    background: 'linear-gradient(45deg, #00d4ff, #ff6b6b)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 16,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    textAlign: 'center',
  },
  statusDot: (color) => ({
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: color,
    display: 'inline-block',
    marginRight: 8,
    boxShadow: `0 0 8px 2px ${color}55`,
    verticalAlign: 'middle',
  }),
  button: (active) => ({
    padding: '10px 24px',
    borderRadius: 20,
    border: 'none',
    background: active ? 'linear-gradient(90deg, #00d4ff, #ff6b6b)' : '#222',
    color: active ? '#fff' : '#aaa',
    fontWeight: 600,
    fontSize: 16,
    cursor: 'pointer',
    marginTop: 8,
    marginBottom: 8,
    transition: 'all 0.2s',
    boxShadow: active ? '0 0 8px #00d4ff88' : 'none',
  }),
  sliderBar: (color) => ({
    width: '100%',
    height: 8,
    borderRadius: 4,
    background: '#222',
    margin: '8px 0',
    overflow: 'hidden',
  }),
  sliderFill: (percent, color) => ({
    width: `${percent}%`,
    height: '100%',
    background: color,
    borderRadius: 4,
    transition: 'width 0.5s',
  }),
  cameraBox: (active) => ({
    width: '100%',
    height: 180,
    background: active ? 'repeating-linear-gradient(135deg, #222 0 10px, #333 10px 20px)' : '#111',
    border: `2px solid ${active ? '#00d4ff' : '#333'}`,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: active ? '#00d4ff' : '#666',
    fontSize: 32,
    marginBottom: 8,
    position: 'relative',
    overflow: 'hidden',
  }),
  cameraAlert: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(255,107,107,0.9)',
    color: '#fff',
    padding: '4px 16px',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    zIndex: 2,
    boxShadow: '0 2px 8px #ff6b6b55',
  },
  lockBox: (locked) => ({
    width: '100%',
    height: 120,
    background: locked ? '#1a1a1a' : '#2a2a2a',
    border: `2px solid ${locked ? '#ff6b6b' : '#4caf50'}`,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 48,
    marginBottom: 8,
    position: 'relative',
    transition: 'all 0.3s',
  }),
  lockAlert: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(76,175,80,0.9)',
    color: '#fff',
    padding: '4px 16px',
    borderRadius: 8,
    fontWeight: 700,
    fontSize: 14,
    zIndex: 2,
    boxShadow: '0 2px 8px #4caf5055',
  },
  notification: {
    position: 'fixed',
    top: 20,
    right: 20,
    background: 'linear-gradient(135deg, #4caf50, #45a049)',
    color: '#fff',
    padding: '12px 20px',
    borderRadius: 8,
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
    zIndex: 1000,
    maxWidth: 300,
    animation: 'slideIn 0.3s ease-out',
  },
  nav: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(20,20,20,0.98)',
    borderTop: '1px solid #222',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '8px 0',
    zIndex: 100,
  },
  navBtn: (active) => ({
    color: active ? '#00d4ff' : '#888',
    fontWeight: 600,
    fontSize: 18,
    background: 'none',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    flex: 1,
    padding: 8,
    transition: 'color 0.2s',
  }),
  bulbIcon: (on) => ({
    fontSize: 48,
    color: on ? '#ffeb3b' : '#666',
    filter: on ? 'drop-shadow(0 0 20px #ffeb3b)' : 'none',
    transition: 'all 0.3s',
  }),
  connectionGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    width: '100%',
    marginBottom: 8,
  },
  connectionItem: {
    textAlign: 'center',
    padding: '8px',
    background: '#1a1a1a',
    borderRadius: 8,
    border: '1px solid #333',
  },
};

function getTempColor(temp) {
  if (temp < 18) return '#2196f3';
  if (temp < 25) return '#4caf50';
  if (temp < 30) return '#ff9800';
  return '#f44336';
}
function getHumidityColor(hum) {
  if (hum < 30) return '#ff9800';
  if (hum < 60) return '#4caf50';
  return '#2196f3';
}

export default function Dashboard() {
  // Notifications
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    const newNotification = { id, message, type };
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Bluetooth connection
  const [bluetoothConnected, setBluetoothConnected] = useState(false);
  const [bluetoothDevices, setBluetoothDevices] = useState([]);
  useEffect(() => {
    const t = setTimeout(() => {
      setBluetoothConnected(true);
      setBluetoothDevices(['Smart Lock', 'Smart Bulb', 'Motion Sensor']);
      addNotification('Bluetooth connected to all devices', 'success');
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  // Wireless connection
  const [connection, setConnection] = useState('connecting');
  useEffect(() => {
    const t = setTimeout(() => setConnection('connected'), 1500);
    return () => clearTimeout(t);
  }, []);

  // Motion sensor
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [motionDetected, setMotionDetected] = useState(false);
  const [lastMotion, setLastMotion] = useState(null);
  useEffect(() => {
    if (!motionEnabled) return;
    const interval = setInterval(() => {
      if (Math.random() < 0.3) {
        setMotionDetected(true);
        setLastMotion(new Date());
        addNotification('Motion detected in living room!', 'warning');
        setTimeout(() => setMotionDetected(false), 2500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [motionEnabled]);

  // Smart Bulb (replacing generic smart switch)
  const [bulbOn, setBulbOn] = useState(false);
  const [bulbBrightness, setBulbBrightness] = useState(0);
  const [bulbColor, setBulbColor] = useState('#ffffff');
  useEffect(() => {
    if (bulbOn) {
      const i = setInterval(() => setBulbBrightness((p) => Math.min(p + Math.random() * 0.5, 100)), 1000);
      return () => clearInterval(i);
    } else {
      const i = setInterval(() => setBulbBrightness((p) => Math.max(p - 2, 0)), 500);
      return () => clearInterval(i);
    }
  }, [bulbOn]);

  // Smart Lock
  const [lockLocked, setLockLocked] = useState(true);
  const [cardDetected, setCardDetected] = useState(false);
  const [lastAccess, setLastAccess] = useState(null);
  
  useEffect(() => {
    // Simulate card detection
    const interval = setInterval(() => {
      if (Math.random() < 0.15) { // 15% chance of card detection
        setCardDetected(true);
        setTimeout(() => {
          setCardDetected(false);
          if (lockLocked) {
            setLockLocked(false);
            setLastAccess(new Date());
            addNotification('Door unlocked with card access', 'success');
            // Auto lock after 30 seconds
            setTimeout(() => {
              setLockLocked(true);
              addNotification('Door auto-locked for security', 'info');
            }, 30000);
          }
        }, 1000);
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [lockLocked]);

  // Temperature & humidity
  const [temp, setTemp] = useState(22);
  const [hum, setHum] = useState(45);
  useEffect(() => {
    const i = setInterval(() => {
      setTemp((t) => Math.max(15, Math.min(35, t + (Math.random() - 0.5) * 2)));
      setHum((h) => Math.max(20, Math.min(80, h + (Math.random() - 0.5) * 4)));
    }, 3000);
    return () => clearInterval(i);
  }, []);

  // Camera
  const [camOn, setCamOn] = useState(false);
  const [camMotion, setCamMotion] = useState(false);
  useEffect(() => {
    if (!camOn) return;
    const i = setInterval(() => {
      if (Math.random() < 0.2) {
        setCamMotion(true);
        addNotification('Motion detected on security camera!', 'warning');
        setTimeout(() => setCamMotion(false), 3000);
      }
    }, 8000);
    return () => clearInterval(i);
  }, [camOn]);

  // Navigation
  const [nav, setNav] = useState('home');

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.title}>Smart Home Hub</div>
        <div style={styles.subtitle}>Control your IoT devices from anywhere</div>

        {/* Connection Status */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Connection Status</div>
          <div style={styles.connectionGrid}>
            <div style={styles.connectionItem}>
              <div style={{fontSize: 12, color: '#aaa', marginBottom: 4}}>WiFi</div>
              <span style={styles.statusDot(
                connection === 'connected' ? '#4caf50' : connection === 'connecting' ? '#ff9800' : '#f44336')}/>
              <span style={{fontSize: 12, fontWeight: 600}}>
                {connection === 'connected' ? 'Connected' : connection === 'connecting' ? 'Connecting...' : 'Disconnected'}
              </span>
            </div>
            <div style={styles.connectionItem}>
              <div style={{fontSize: 12, color: '#aaa', marginBottom: 4}}>Bluetooth</div>
              <span style={styles.statusDot(bluetoothConnected ? '#4caf50' : '#ff9800')}/>
              <span style={{fontSize: 12, fontWeight: 600}}>
                {bluetoothConnected ? 'Connected' : 'Connecting...'}
              </span>
            </div>
          </div>
          <div style={{fontSize: 12, color: '#aaa', marginTop: 8}}>
            {bluetoothConnected && `Connected to ${bluetoothDevices.length} devices`}
          </div>
        </div>

        {/* Smart Lock */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Smart Lock</div>
          <div style={styles.lockBox(lockLocked)}>
            {lockLocked ? (
              <>
                {cardDetected && <div style={styles.lockAlert}>CARD DETECTED</div>}
                <span role="img" aria-label="locked">🔒</span>
              </>
            ) : (
              <>
                <span role="img" aria-label="unlocked">🔓</span>
              </>
            )}
          </div>
          <span style={styles.statusDot(lockLocked ? '#ff6b6b' : '#4caf50')}/>
          <span style={{fontWeight: 600}}>
            {lockLocked ? 'Door Locked' : 'Door Unlocked'}
          </span>
          <div style={{fontSize: 12, color: '#aaa', marginTop: 4}}>
            {lastAccess && !lockLocked && (
              <>Last access: {lastAccess.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</>
            )}
            {cardDetected && 'Card detected, unlocking...'}
          </div>
          <button style={styles.button(!lockLocked)} onClick={() => setLockLocked(!lockLocked)}>
            {lockLocked ? 'Unlock Door' : 'Lock Door'}
          </button>
        </div>

        {/* Smart Bulb */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Smart Bulb</div>
          <span style={styles.bulbIcon(bulbOn)} role="img" aria-label="bulb">💡</span>
          <span style={styles.statusDot(bulbOn ? '#ffeb3b' : '#888')}/>
          <span style={{fontWeight: 600}}>
            {bulbOn ? 'Bulb is ON' : 'Bulb is OFF'}
          </span>
          <div style={{fontSize: 12, color: '#aaa', marginTop: 4}}>Brightness</div>
          <div style={styles.sliderBar('#ffeb3b')}>
            <div style={styles.sliderFill(bulbBrightness, '#ffeb3b')}/>
          </div>
          <div style={{fontSize: 12, color: '#aaa'}}>{bulbBrightness.toFixed(1)}%</div>
          <button style={styles.button(bulbOn)} onClick={() => {
            setBulbOn(!bulbOn);
            addNotification(bulbOn ? 'Bulb turned off' : 'Bulb turned on', 'info');
          }}>
            {bulbOn ? 'Turn Off Bulb' : 'Turn On Bulb'}
          </button>
        </div>

        {/* Motion Sensor */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Motion Sensor (PIR)</div>
          <span style={styles.statusDot(motionDetected ? '#ff6b6b' : motionEnabled ? '#4caf50' : '#888')}/>
          <span style={{fontWeight: 600}}>
            {motionDetected ? 'Motion Detected!' : motionEnabled ? 'Monitoring...' : 'Sensor Disabled'}
          </span>
          <div style={{fontSize: 12, color: '#aaa', marginTop: 4}}>
            {lastMotion && motionDetected && (
              <>Last detected: {lastMotion.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</>
            )}
          </div>
          <button style={styles.button(motionEnabled)} onClick={() => setMotionEnabled((v) => !v)}>
            {motionEnabled ? 'Disable Sensor' : 'Enable Sensor'}
          </button>
        </div>

        {/* Temperature & Humidity */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Temperature & Humidity</div>
          <div style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: 8}}>
            <span style={{color: getTempColor(temp), fontWeight: 600}}>🌡️ {temp.toFixed(1)}°C</span>
            <span style={{color: getHumidityColor(hum), fontWeight: 600}}>💧 {hum.toFixed(0)}%</span>
          </div>
          <div style={styles.sliderBar(getTempColor(temp))}>
            <div style={styles.sliderFill(((temp - 15) / 20) * 100, getTempColor(temp))}/>
          </div>
          <div style={{fontSize: 12, color: getTempColor(temp), marginBottom: 8}}>
            {temp < 18 ? 'Cold' : temp < 25 ? 'Comfortable' : temp < 30 ? 'Warm' : 'Hot'}
          </div>
          <div style={styles.sliderBar(getHumidityColor(hum))}>
            <div style={styles.sliderFill(hum, getHumidityColor(hum))}/>
          </div>
          <div style={{fontSize: 12, color: getHumidityColor(hum)}}>
            {hum < 30 ? 'Low' : hum < 60 ? 'Comfortable' : 'High'}
          </div>
        </div>

        {/* Camera */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Security Camera</div>
          <div style={styles.cameraBox(camOn)}>
            {camOn ? (
              <>
                {camMotion && <div style={styles.cameraAlert}>MOTION DETECTED</div>}
                <span role="img" aria-label="camera">📹</span>
              </>
            ) : (
              <span style={{fontSize: 40, color: '#666'}}>📷</span>
            )}
          </div>
          <button style={styles.button(camOn)} onClick={() => setCamOn((v) => !v)}>
            {camOn ? 'Stop Stream' : 'Start Stream'}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {notifications.map(notification => (
        <div key={notification.id} style={styles.notification}>
          {notification.message}
        </div>
      ))}

      {/* Bottom Navigation */}
      <nav style={styles.nav}>
        <button style={styles.navBtn(nav === 'home')} onClick={() => setNav('home')}>
          🏠<div style={{fontSize: 12}}>Home</div>
        </button>
        <button style={styles.navBtn(nav === 'camera')} onClick={() => setNav('camera')}>
          📹<div style={{fontSize: 12}}>Camera</div>
        </button>
        <button style={styles.navBtn(nav === 'lock')} onClick={() => setNav('lock')}>
          🔒<div style={{fontSize: 12}}>Lock</div>
        </button>
        <button style={styles.navBtn(nav === 'settings')} onClick={() => setNav('settings')}>
          ⚙️<div style={{fontSize: 12}}>Settings</div>
        </button>
      </nav>
      <div style={{height: 56}}/>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
