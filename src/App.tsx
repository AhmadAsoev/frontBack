import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Registration from './components/Registration';
import TableList from './components/TableList';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<NavBar />} />
        <Route path='registration' element={<Registration />} />
        <Route path='/table' element={<TableList/>} />
      </Routes>
    </Router>
  )
}

export default App

