import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // Import Home component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
