import { createContext, useContext, useEffect, useState } from 'react';

const DarkModeContext = createContext(); // context 만듦

export function DarkModeProvider({ children }) { // 우산 만듦 - 인자로 자식노드 받아옴
    const [darkMode, setDarkMode] = useState(false); // 기본값은 light mode로 시작
    const toggleDarkMode = () => { // 자식에서는 토글만 누르면 반대의 모드로 전환되도록
        setDarkMode(!darkMode); // darkMode가 된 경우
        updateDarkMode(!darkMode);      
    };

    useEffect(() => { // 이전 모드(다크모드)를 기억하고 html의 localStorage에 업데이트
        const isDark = // dark모드인지 아닌지 저장
            localStorage.theme === 'dark' || 
            (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches);
        setDarkMode(isDark); // 브라우저 세팅 값에 따라 해당 모드로 저장
        updateDarkMode(isDark);
    }, []);
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children} 
        </DarkModeContext.Provider> // children 중에 darkMode와 toggleDarkMode가 필요한 것만 접근
    );
}
// 사용하는 곳에서 useDarkMode를 쓰면 내부적으로 어떤 context를 쓰는지 신경 안써도 됨

function updateDarkMode(darkMode) { // darkMode가 되면 class가 dark가 되고, 반대의 경우 class명이 없어지게 설정
    if(darkMode) {
        document.documentElement.classList.add('dark'); // class에 dark 입력
        localStorage.theme = 'dark'; // localStorage에 저장
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
    }
}
export const useDarkMode = () => useContext(DarkModeContext);