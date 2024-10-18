import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Navbar from "./components/utilities/Navbar";
import CreateJoke from './components/jokes/CreateJoke';
import UpdateJoke from './components/jokes/UpdateJoke';
import Jokes from './components/jokes/Jokes';
import FavoriteJokes from './components/jokes/FavoriteJokes';

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
            <Route path='/jokes' element={<Jokes />} />
            <Route path='/jokes/add' element={<CreateJoke />} />
            <Route path='/jokes/:id/update' element={<UpdateJoke />} />
            <Route path='/jokes/favorite' element={<FavoriteJokes />} />
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
