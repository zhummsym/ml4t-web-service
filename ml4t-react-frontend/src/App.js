import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home/Home';
import { LoginSignup } from './Components/LoginSignup/LoginSignup';
import { Dashboard } from './Components/Dashboard/Dashboard';
import { Forecast } from './Components/Forecast/Forecast';
import { Portfolio } from './Components/Portfolio/Portfolio';
import { Trade } from './Components/Trade/Trade';
import { Profile } from './Components/Profile/Profile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route path="/login-signup" element={<LoginSignup />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route element={<Dashboard />}>
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
    </Router>
    
  );
}

export default App;
