import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './Todo.scss';

function Todo() {

    type Todo = {
        id: string;
        text: string;
        completed: boolean;
    };

    const [todos, setTodos] = useState<Todo[]>(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos) : [];
    });
    const [input, setInput] = useState<string>('');
    const [sortCompleted, setSortCompleted] = useState(false);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const toggleCompleted = (id: string) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };
    
    const removeTodo = (id:string) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const sortedTodos = [...todos].sort((a, b) => {
        if (sortCompleted) {
            return a.completed && !b.completed ? 1 : -1;
        }
        return 0;
    });

    return (
        <div className='todo'>
            <span className='title'>Todo List</span>
            <span className='sub-comment'>Get things done, one item at a time.</span>

            <form className='form' onSubmit={(event) => {
                event.preventDefault();
                setTodos([...todos, { id: uuidv4(), text: input, completed: false }]);
                setInput('');
            }}>
                <input className='todo-input' type="text" value={input} onChange={(e) => setInput(e.target.value)} />
                <button className='btn-add' type="submit">Add</button>
            </form>
            
            {sortedTodos.map((todo) => (
                <div className='item' key={todo.id}>
                    <label className='item-label' onChange={() => toggleCompleted(todo.id)}>
                        <input className='check-box' type="checkbox"/>
                        <span className='label'>{todo.text}</span>
                    </label>
                    <button className='btn-delete' onClick={() => removeTodo(todo.id)}>DEL</button>
                </div>
            ))}
        </div>
    );
}

export default Todo;