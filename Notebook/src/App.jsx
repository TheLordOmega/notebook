import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar/Sidebar';
import { MoodBoard as Home } from './pages/Home';
import { Note } from './pages/Note';
import { Favorites } from './pages/Favorites';
import './App.css';
import { TasksProvider } from './save/TasksContext';



function App() {
  return (
    <TasksProvider>
      <Router>
        <div className='app'>
          <Sidebar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/note/:id' element={<Note />} />
            <Route path='/favorites' element={<Favorites />} />
          </Routes>
        </div>
      </Router>
    </TasksProvider>

  );
}

export default App;
