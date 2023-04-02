import React, { useState } from 'react';
import styles from './AddTodo.module.css';
// todo가 새로 입력되면 TodoList에 전달해줌

export default function AddTodo({ onAdd }) {
    const [text, setText] = useState('');
    const handleChange = (e) => setText(e.target.value);
    const handleSubmit = (e) => {
        e.preventDefault(); // 페이지가 refresh되지 않도록 함
        if (text.trim().length === 0){ // trim - 텍스트의 여백 없앰
            return; // 공백이 입력된 경우 리스트에 추가하지 않음
        }
        onAdd({id: '고유한 값', text, status: 'active'});
        setText(''); // 문자열 초기화
    };
    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
            className={styles.input}
            type='text' 
            placeholder='Add Todo'
            value = {text}
            onChange = {handleChange}
             />
             <button className={styles.button}>Add</button>
        </form>
    );
}