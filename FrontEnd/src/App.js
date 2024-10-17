import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import About from './components/About';
import Home from "./Home";
import HostelDetail from './components/HostelDetail';
import CheckHostels from "./components/CheckHostels";
import SearchedHostels from "./components/SearchedHostels";
import FilteredHostelList from "./components/FilteredHostelList";
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Replace 'YOUR_NGROK_URL' with your actual Ngrok URL
    fetch(`${process.env.REACT_APP_BACKEND_API_URL}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(data => setMessage(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home message={message} />} />
            <Route path="/hostel/:name" element={<HostelDetail message={message} />} />
            <Route path="/hostels" element={<CheckHostels />} />
            <Route path="/searchedhostels" element={<SearchedHostels />} />
            <Route path="/filtered-hostels" element={<FilteredHostelList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
