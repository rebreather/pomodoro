import './SideMenu.scss';

function Menu({setActiveContent, activeContent}: { setActiveContent: (content: string) => void, activeContent: string}) {

    return (
      <div className="menu-area">
        <button className={`btn-timer ${activeContent === 'timer' ? 'active' : ''}`} onClick={() => setActiveContent('timer')}>Timer</button>
        <button className={`btn-todo ${activeContent === 'todo' ? 'active' : ''}`} onClick={() => setActiveContent('todo')}>Todo</button>
      </div>
    );
  }
  
  export default Menu;
  