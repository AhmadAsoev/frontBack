import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<NavBar/>}  />
      </Routes>
    </Router>
  )
}

export default App

