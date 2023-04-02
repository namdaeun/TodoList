import React, { useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    const [todos, setTodos] = useState([
        { id: '123', text: '프언론 과제', status: 'active' },
        { id: '124', text: '프언론 복습', status: 'active' }
    ]);
    const handleAdd = (todo) => {// 새로운 투두를 todos에 update
        setTodos([...todos, todo]);
    };
    const handleUpdate = (updated) => {// 기존의 id와 update되는 id가 같으면 update된 걸 씀
        setTodos(todos.map((t) => t.id === updated.id ? updated : t));
    };
    const handleDelete = (deleted) => {// 삭제하고자하는 id가 아닌 경우만 filter해서 새로운 배열 만듦
        setTodos(todos.filter(t => t.id !== deleted.id));
    };
    const filtered = getFilteredItems(todos, filter);
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {
                    filtered.map((item) => (<Todo  // 필터링된 아이템들만 보여지도록
                        key={item.id} todo={item} 
                        onUpdate={handleUpdate} onDelete={handleDelete} 
                        />
                ))}
            </ul>
            <AddTodo onAdd={handleAdd} />
        </section>
    );
}
function getFilteredItems(todos, filter) {
    if(filter === 'all' ) {
        return todos;
    }
    return todos.filter((todo) => todo.status === filter);
}