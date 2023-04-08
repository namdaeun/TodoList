import React, { useEffect, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import Todo from '../Todo/Todo';
import styles from './TodoList.module.css';

export default function TodoList({ filter }) {
    //const [todos, setTodos] = useState(readTodosFromLocalStorage()); // 이렇게 하면 불필요하게 많이 호출함
    const [todos, setTodos] = useState(() => readTodosFromLocalStorage()); // 따라서 콜백함수 사용

    const handleAdd = (todo) => setTodos([...todos, todo]); // 새로운 투두를 todos에 update
    const handleUpdate = (updated) =>  // 기존의 id와 update되는 id가 같으면 update된 걸 씀
        setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    const handleDelete = (deleted) =>  // 삭제하고자하는 id가 아닌 경우만 filter해서 새로운 배열 만듦
        setTodos(todos.filter((t) => t.id !== deleted.id)); 

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        // todos라는 key에 todos를 JSON형태로 변경한 것을 저장
    }, [todos]) // todos가 변경이 될 때마다 실행

    const filtered = getFilteredItems(todos, filter);
    return (
        <section className={styles.container}>
            <ul className={styles.list}>
                {filtered.map((item, idx) => (
                    <Todo  // 필터링된 아이템들만 보여지도록
                        key={idx} // key값을 고유하게 만듦
                        todo={item} 
                        onUpdate={handleUpdate} 
                        onDelete={handleDelete} 
                    />
                ))}
            </ul>
            <AddTodo onAdd={handleAdd} />
        </section>
    );
}
function readTodosFromLocalStorage() {

    const todos = localStorage.getItem('todos'); // todos값 가져와서 todos에 저장
    return todos ? JSON.parse(todos) : [];   
    // todo값이 있으면 JSON으로 parse하여 변환한 배열을 리턴, 없으면 공백 리턴
}

function getFilteredItems(todos, filter) {
    if (filter === 'all') {
      return todos;
    }
    return todos.filter((todo) => todo.status === filter);
  }