import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import GanttChart from './pages/GanttChart';
import Budget from './pages/Budget';
import Skills from './pages/Skills';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="gantt" element={<GanttChart />} />
          <Route path="budget" element={<Budget />} />
          <Route path="skills" element={<Skills />} />
          <Route path="chat" element={<Chat />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;