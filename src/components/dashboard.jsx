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
        setTimeout(() => setMotionDetected(false), 2500);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [motionEnabled]);

  // Smart switch
  const [switchOn, setSwitchOn] = useState(false);
  const [power, setPower] = useState(0);
  useEffect(() => {
    if (switchOn) {
      const i = setInterval(() => setPower((p) => Math.min(p + Math.random() * 0.5, 100)), 1000);
      return () => clearInterval(i);
    } else {
      const i = setInterval(() => setPower((p) => Math.max(p - 2, 0)), 500);
      return () => clearInterval(i);
    }
  }, [switchOn]);

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
        setTimeout(() => setCamMotion(false), 3000);
      }
    }, 8000);
    return () => clearInterval(i);
  }, [camOn]);

  // Navigation (for mobile look)
  const [nav, setNav] = useState('home');

  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <div style={styles.title}>Smart Home Hub</div>
        <div style={styles.subtitle}>Control your IoT devices from anywhere</div>

        {/* Wireless Connection */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Wireless Connection</div>
          <span style={styles.statusDot(
            connection === 'connected' ? '#4caf50' : connection === 'connecting' ? '#ff9800' : '#f44336')}/>
          <span style={{fontWeight:600}}>
            {connection === 'connected' ? 'Connected' : connection === 'connecting' ? 'Connecting...' : 'Disconnected'}
          </span>
          <div style={{fontSize:12, color:'#aaa', marginTop:4}}>
            {connection === 'connected' ? 'All devices online' : connection === 'connecting' ? 'Establishing connection...' : 'Check your connection'}
          </div>
        </div>

        {/* Motion Sensor */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Motion Sensor (PIR)</div>
          <span style={styles.statusDot(motionDetected ? '#ff6b6b' : motionEnabled ? '#4caf50' : '#888')}/>
          <span style={{fontWeight:600}}>
            {motionDetected ? 'Motion Detected!' : motionEnabled ? 'Monitoring...' : 'Sensor Disabled'}
          </span>
          <div style={{fontSize:12, color:'#aaa', marginTop:4}}>
            {lastMotion && motionDetected && (
              <>Last detected: {lastMotion.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</>
            )}
          </div>
          <button style={styles.button(motionEnabled)} onClick={()=>setMotionEnabled((v)=>!v)}>
            {motionEnabled ? 'Disable Sensor' : 'Enable Sensor'}
          </button>
        </div>

        {/* Smart Switch */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Smart Switch</div>
          <span style={styles.statusDot(switchOn ? '#00d4ff' : '#888')}/>
          <span style={{fontWeight:600}}>
            {switchOn ? 'Device is ON' : 'Device is OFF'}
          </span>
          <div style={{fontSize:12, color:'#aaa', marginTop:4}}>Power Consumption</div>
          <div style={styles.sliderBar(getTempColor(temp))}>
            <div style={styles.sliderFill(power, '#00d4ff')}/>
          </div>
          <div style={{fontSize:12, color:'#aaa'}}>{power.toFixed(1)}%</div>
          <button style={styles.button(switchOn)} onClick={()=>setSwitchOn((v)=>!v)}>
            {switchOn ? 'Turn Off' : 'Turn On'}
          </button>
        </div>

        {/* Temperature & Humidity */}
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Temperature & Humidity</div>
          <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:8}}>
            <span style={{color:getTempColor(temp),fontWeight:600}}>🌡️ {temp.toFixed(1)}°C</span>
            <span style={{color:getHumidityColor(hum),fontWeight:600}}>💧 {hum.toFixed(0)}%</span>
          </div>
          <div style={styles.sliderBar(getTempColor(temp))}>
            <div style={styles.sliderFill(((temp-15)/20)*100, getTempColor(temp))}/>
          </div>
          <div style={{fontSize:12, color:getTempColor(temp),marginBottom:8}}>
            {temp < 18 ? 'Cold' : temp < 25 ? 'Comfortable' : temp < 30 ? 'Warm' : 'Hot'}
          </div>
          <div style={styles.sliderBar(getHumidityColor(hum))}>
            <div style={styles.sliderFill(hum, getHumidityColor(hum))}/>
          </div>
          <div style={{fontSize:12, color:getHumidityColor(hum)}}>
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
              <span style={{fontSize:40, color:'#666'}}>📷</span>
            )}
          </div>
          <button style={styles.button(camOn)} onClick={()=>setCamOn((v)=>!v)}>
            {camOn ? 'Stop Stream' : 'Start Stream'}
          </button>
        </div>
      </div>

      {/* Bottom Navigation (for mobile look) */}
      <nav style={styles.nav}>
        <button style={styles.navBtn(nav==='home')} onClick={()=>setNav('home')}>🏠<div style={{fontSize:12}}>Home</div></button>
        <button style={styles.navBtn(nav==='camera')} onClick={()=>setNav('camera')}>📹<div style={{fontSize:12}}>Camera</div></button>
        <button style={styles.navBtn(nav==='network')} onClick={()=>setNav('network')}>📡<div style={{fontSize:12}}>Network</div></button>
        <button style={styles.navBtn(nav==='settings')} onClick={()=>setNav('settings')}>⚙️<div style={{fontSize:12}}>Settings</div></button>
      </nav>
      <div style={{height:56}}/>
    </div>
  );
}
