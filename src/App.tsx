import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Registration from './components/Registration';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<NavBar />} />
        <Route path='registration' element={<Registration/> } />
      </Routes>
    </Router>
  )
}

export default App

