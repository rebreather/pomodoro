import { useState } from 'react';
import './App.css';
import Menu from './side-menu/SideMenu';
import Content from './main-content/Content';

function App() {
  const [activeContent, setActiveContent] = useState('timer');
  return (
    <div className="App">
      <Menu setActiveContent={setActiveContent} activeContent={activeContent} />
      <Content activeContent={activeContent} />
    </div>
  );
}

export default App;
