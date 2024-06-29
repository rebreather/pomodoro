import './Content.css';
import Timer from './Timer';
import Todo from './Todo';

function Content({ activeContent }: { activeContent: string}) {
    return (
        <div className="content-area">
            {activeContent === 'timer' &&<Timer />}
            {activeContent === 'todo' &&<Todo />}
        </div>
    );
}

export default Content;