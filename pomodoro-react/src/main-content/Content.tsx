import './Content.css';
import Timer from './Timer';

function Content({ activeContent }: { activeContent: string}) {
    return (
        <div className="content-area">
            <div className='menu'>
                {activeContent === 'timer' && <div className='todo-content'><Timer /></div>}
                {activeContent === 'todo' && <span className='todo-content'>here is Todo content</span>}
            </div>
        </div>
    );
}

export default Content;