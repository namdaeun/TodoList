import React, { useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';


export default function TodoList() {
    const [todos, setTodos] = useState([
        {id: '123', text: '프언론 과제', status: 'active'},
        {id: '124', text: '프언론 복습', status: 'active'}
    ]);
    const handleAdd= (todo) => {
        // 새로운 투두를 todos에 update
        console.log(todo);
        setTodos([...todos, todo]);
    };
     return (
        <section>
            <ul>
                {
                    todos.map((item) => (<li key={item.id}>{item.text}</li>
                ))}
            </ul>
            <AddTodo onAdd={handleAdd}/>
        </section>
    );
}