import './Content.css';
import Timer from './Timer';
import Todo from './Todo';

function Content({ activeContent }: { activeContent: string}) {
    return (
        <div className="content-area">
            <div className='menu'>
                {activeContent === 'timer' && <div className='todo-content'><Timer /></div>}
                {activeContent === 'todo' && <span className='todo-content'><Todo /></span>}
            </div>
        </div>
    );
}

export default Content;