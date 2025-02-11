import axios from 'axios';

// 회원가입
const API_URL = 'http://localhost:8080/todo/user/signup';

export const signup = async (userName, email, password) => {
  try {
    const response = await axios.post(API_URL, {
      userName,
      email,
      password,
    });
    return response.data;  
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);  
    } else {
      throw new Error('회원가입 실패');  
    }
  }
};

// 로그인
const LOGIN_API_URL = 'http://localhost:8080/todo/user/login';

export const login = async (email, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { email, password });

    const token = response.data.token;

    // 받은 토큰을 localStorage에 저장
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiry', Date.now() + 3600000);
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data);
    } else {
      throw new Error('로그인 실패');
    }
  }
};

// 할 일 목록 가져오기
const ToDoList_API_URL = 'http://localhost:8080/todos';

export const getTodos = async () => {
  try {
    const response = await fetch(ToDoList_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching todos:', error.message);
    throw error;
  }
};

// 할 일 추가
export const addTodo = async (title, due_date) => {
  try {
    const response = await fetch(ToDoList_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, due_date }),
    });
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    return response.json();
  } catch (error) {
    console.error('Error adding todo:', error.message);
    throw error;
  }
};

// 할 일 수정
export const updateTodo = async (id, updatedTodo) => {
  try {
    const { title, description, category, priority, status, due_date } = updatedTodo; 
    const response = await fetch(`${ToDoList_API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description, category, priority, status, due_date }), 
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }

    return response.json(); // 수정된 할 일을 반환
  } catch (error) {
    console.error('Error updating todo:', error.message);
    throw error;
  }
};