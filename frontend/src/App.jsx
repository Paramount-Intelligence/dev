import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InternList from './pages/InternList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InternList />} />
      </Routes>
    </Router>
  );
}

export default App;
