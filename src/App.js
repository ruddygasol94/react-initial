import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Login user={user} setUser={setUser} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;