import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import tinaImg from './assets/tina_profile.png';

// --- HOME PAGE ---
const Home = () => (
  <div className="page-container">
    <h1>Welcome to the React Multi-Tool Hub</h1>
    <p style={{ textAlign: 'center' }}>Explore the 10 linked tools and pages below.</p>
    
    <div className="dashboard-grid">
      <Link to="/login" className="card"><h3>1. Login</h3></Link>
      <Link to="/register" className="card"><h3>2. Register</h3></Link>
      <Link to="/counter" className="card"><h3>3. Counter</h3></Link>
      <Link to="/stopwatch" className="card"><h3>4. Stopwatch</h3></Link>
      <Link to="/theme" className="card"><h3>5. Light/Dark Mode</h3></Link>
      <Link to="/palindrome" className="card"><h3>6. Palindrome Check</h3></Link>
      <Link to="/prime" className="card"><h3>7. Prime Check</h3></Link>
      <Link to="/map" className="card"><h3>8. Map </h3></Link>
      <Link to="/weather" className="card"><h3>9. Weather </h3></Link>
      <Link to="/profile" className="card neon-border-purple"><h3>10. My Profile</h3></Link>
      
    </div>
  </div>
);

// --- AUTH PAGES ---
const Login = () => (
  <div className="page-container">
    <h1>Login</h1>
    <div className="form-group">
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Sign In</button>
    </div>
  </div>
);

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password.length < 6) {
      setStatus('Password must be at least 6 characters!');
      return;
    }
    setStatus('Processing...');
    setTimeout(() => setStatus(`Welcome, ${formData.name}! Account created.`), 1500);
  };

  return (
    <div className="page-container">
      <h1>Initialize Profile</h1>
      <form onSubmit={handleRegister} className="form-group">
        <input 
          type="text" placeholder="Full Name" required
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="password" placeholder="Create Password" required
          onChange={(e) => setFormData({...formData, password: e.target.value})}
        />
        <button type="submit">Create Access Key</button>
      </form>
      {status && <div className="result-box">{status}</div>}
    </div>
  );
};

// Apply similar logic to the Login component for "Access Granted" feedback
// --- USEEFFECT PAGES ---

const Counter = () => {
  const [count, setCount] = useState(0);
  useEffect(() => { document.title = `Count: ${count}`; }, [count]);
  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <h1>Counter</h1>
      <h2>{count}</h2>
      <div style={{ gap: '10px', display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => setCount(c => c - 1)}>-</button>
        <button onClick={() => setCount(c => c + 1)}>+</button>
      </div>
    </div>
  );
};

const Stopwatch = () => {
  const [time, setTime] = useState(0); // Time is now tracked in milliseconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      // Updates every 10 milliseconds for a smooth visual effect
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    
    // Cleanup function to clear the interval when it stops or unmounts
    return () => clearInterval(intervalId);
  }, [isRunning]);

  // Math to format the time into MM:SS:MS
  const minutes = Math.floor((time / 60000) % 60);
  const seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time / 10) % 100);

  // Pad single digits with a leading zero (e.g., 9 becomes 09)
  const formatTime = (unit) => unit.toString().padStart(2, '0');

  return (
    <div className="page-container" style={{ textAlign: 'center' }}>
      <h1>Stopwatch</h1>
      
      {/* Display formatted time */}
      <h2 style={{ fontSize: '3rem', fontFamily: 'monospace' }}>
        {formatTime(minutes)}:{formatTime(seconds)}:{formatTime(milliseconds)}
      </h2>
      
      <div style={{ gap: '10px', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <button 
          onClick={() => setIsRunning(!isRunning)}
          style={{ backgroundColor: isRunning ? '#ef4444' : '#10b981' }} // Turns red when running, green when stopped
        >
          {isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={() => { setTime(0); setIsRunning(false); }}>
          Reset
        </button>
      </div>
    </div>
  );
};

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    // Simulating side effect by logging theme change
    console.log(`Theme changed to ${isDark ? 'Dark' : 'Light'}`);
  }, [isDark]);

  return (
    <div className="page-container">
      <div className={`dark-mode-wrapper ${isDark ? 'dark' : 'light'}`}>
        <h1>Theme Switcher</h1>
        <p>This container reacts to the theme state.</p>
        <button onClick={() => setIsDark(!isDark)}>
          Toggle {isDark ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

const PalindromeCheck = () => {
  const [text, setText] = useState('');
  const [isPal, setIsPal] = useState(null);

  useEffect(() => {
    if (!text) { setIsPal(null); return; }
    const cleaned = text.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    setIsPal(cleaned === cleaned.split('').reverse().join(''));
  }, [text]);

  return (
    <div className="page-container">
      <h1>Palindrome Checker</h1>
      <div className="form-group">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Type a word..." 
        />
        {isPal !== null && (
          <div className="result-box">
            {isPal ? "✅ It's a Palindrome!" : "❌ Not a Palindrome."}
          </div>
        )}
      </div>
    </div>
  );
};

const PrimeCheck = () => {
  const [num, setNum] = useState('');
  const [isPrime, setIsPrime] = useState(null);

  useEffect(() => {
    const check = parseInt(num);
    if (!num || isNaN(check) || check <= 1) { setIsPrime(null); return; }
    
    let prime = true;
    for (let i = 2; i <= Math.sqrt(check); i++) {
      if (check % i === 0) { prime = false; break; }
    }
    setIsPrime(prime);
  }, [num]);

  return (
    <div className="page-container">
      <h1>Prime Number Checker</h1>
      <div className="form-group">
        <input 
          type="number" 
          value={num} 
          onChange={(e) => setNum(e.target.value)} 
          placeholder="Enter a number..." 
        />
        {isPrime !== null && (
          <div className="result-box">
            {isPrime ? "✅ It is a Prime Number!" : "❌ Not a Prime Number."}
          </div>
        )}
      </div>
    </div>
  );
};

// --- API PAGES ---

const GoogleMap = () => {
  // We initialize the map with your college location as the default
  const [query, setQuery] = useState('United College of Engineering and Research, Prayagraj');
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault(); // Prevents the page from refreshing on form submit
    if (searchInput.trim()) {
      setQuery(searchInput);
    }
  };

  // This dynamic URL updates whenever 'query' changes
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="page-container">
      <h1>Explore Locations</h1>
      
      {/* Search Bar Section */}
      <form onSubmit={handleSearch} style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px', 
        justifyContent: 'center' 
      }}>
        <input 
          type="text" 
          placeholder="Search for a city, landmark, or street..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: 1, maxWidth: '400px' }}
        />
        <button type="submit">Search</button>
      </form>
      
      {/* Map Display */}
      <div style={{ 
        borderRadius: '12px', 
        overflow: 'hidden', 
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <iframe
          title="google-map"
          width="100%"
          height="450"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
      
      <p style={{ textAlign: 'center', marginTop: '1rem', color: '#64748b' }}>
        Showing results for: <strong>{query}</strong>
      </p>
    </div>
  );
};

const WeatherApp = () => {
  // Set the default city to Prayagraj
  const [city, setCity] = useState('Prayagraj'); 
  const [searchInput, setSearchInput] = useState('');
  
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput.trim());
      setSearchInput(''); // Clear the input field after searching
    }
  };

  // This useEffect now runs every time the 'city' state changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    // Notice the dynamic URL using backticks and the ${city} variable
    fetch(`https://wttr.in/${city}?format=j1`)
      .then(res => {
        if (!res.ok) throw new Error('Could not find weather for that location.');
        return res.json();
      })
      .then(data => {
        if (data && data.current_condition) {
          const current = data.current_condition[0];
          setWeather({
            temperature: current.temp_C,
            windspeed: current.windspeedKmph,
            description: current.weatherDesc[0].value
          });
          setLoading(false);
        } else {
          throw new Error('Data format error.');
        }
      })
      .catch(err => {
        console.error(err);
        setError("Location not found or server issue.");
        setLoading(false);
      });
  }, [city]); // The array [city] tells React: "Run this fetch again if 'city' changes"

  return (
    <div className="page-container">
      <h1>Weather Search</h1>
      
      {/* The Search Form */}
      <form onSubmit={handleSearch} style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '20px', 
        justifyContent: 'center',
        maxWidth: '400px',
        margin: '0 auto 2rem auto'
      }}>
        <input 
          type="text" 
          placeholder="Enter city name..." 
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit">Check Weather</button>
      </form>

      {/* Loading State */}
      {loading && <p style={{ textAlign: 'center' }}>Fetching weather for {city}...</p>}
      
      {/* Error State */}
      {error && (
        <div style={{ textAlign: 'center', color: '#ef4444', padding: '1rem', backgroundColor: '#fee2e2', borderRadius: '8px' }}>
          <h3>Oops!</h3>
          <p>{error}</p>
        </div>
      )}

      {/* Success State */}
      {!loading && !error && weather && (
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <h2 style={{ color: '#334155', textTransform: 'capitalize' }}>{city}</h2>
          <h1 style={{ fontSize: '4rem', color: '#0ea5e9', margin: '10px 0' }}>{weather.temperature}°C</h1>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{weather.description}</p>
          <h2 style={{ color: '#475569', marginTop: '10px', fontSize: '1rem' }}>Wind: {weather.windspeed} km/h</h2>
        </div>
      )}
    </div>
  );
};
const Profile = () => (
  <div className="page-container profile-main">
    <div className="profile-card-header"></div>
    
    <div className="profile-layout">
      <div className="image-avatar-container">
        {/* Replace with your image path */}
        <img src={tinaImg} alt="Tina" className="tina_profile.jpg" />
      </div>
      
      <div className="profile-info">
        <h1 className="neon-text-cyan">Tina</h1>
        <p className="subtitle">2nd Year B.Tech Student</p>
        <div className="info-badge">United College of Engineering and Research</div>
        
        <div className="skills-container">
          <span className="skill-tag">React</span>
          <span className="skill-tag">Python</span>
          <span className="skill-tag">Frontend</span>
          <span className="skill-tag">AI/ML</span>
        </div>

        <div className="social-links">
          <a 
    href="https://github.com/Tinaasahu" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <button className="social-btn github">GitHub</button>
  </a>
          
          <a 
    href="https://www.linkedin.com/in/tina-sahu-3609a6327/" 
    target="_blank" 
    rel="noopener noreferrer"
    style={{ textDecoration: 'none' }}
  >
    <button className="social-btn linkedin">LinkedIn</button>
  </a>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/counter">Counter</Link>
        <Link to="/stopwatch">Stopwatch</Link>
        <Link to="/theme">Theme</Link>
        <Link to="/palindrome">Palindrome</Link>
        <Link to="/prime">Prime</Link>
        <Link to="/map">Map API</Link>
        <Link to="/weather">Weather API</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/stopwatch" element={<Stopwatch />} />
        <Route path="/theme" element={<ThemeToggle />} />
        <Route path="/palindrome" element={<PalindromeCheck />} />
        <Route path="/prime" element={<PrimeCheck />} />
        <Route path="/map" element={<GoogleMap />} />
        <Route path="/weather" element={<WeatherApp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;