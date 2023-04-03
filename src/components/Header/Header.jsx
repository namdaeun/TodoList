import React from 'react';
import { useDarkMode } from '../../context/DarkModeContext';
import styles from './Header.module.css';
import { HiMoon, HiSun } from 'react-icons/hi';

export default function Header({ filters, filter, onFilterChange }) {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className={styles.header}>
      <button onClick={toggleDarkMode} className={styles.toggle}>
        {!darkMode && <HiMoon />}
        {darkMode && <HiSun />}
      </button>
      <ul className={styles.filters}>
        {filters.map((value, index) => (
          <li key={index}>
            <button
              className={`${styles.filter} ${
                filter === value && styles.selected
                // 버튼과 현재 선택된 value값이 같은 경우(selected된 버튼이라면)
                // styles.selected도 해줌 => 선택된 버튼이 더 선명하게 보임
              }`}
              onClick={() => onFilterChange(value)}
            >
              {value}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
}
