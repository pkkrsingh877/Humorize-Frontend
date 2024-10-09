import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from "./components/utilities/Navbar";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
