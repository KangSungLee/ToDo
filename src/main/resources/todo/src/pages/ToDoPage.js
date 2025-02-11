import React, { useState, useEffect } from 'react';
import { getTodos, addTodo, updateTodo } from '../services/authService'; // authService에서 함수 가져오기
import Calendar from '../components/Calendar';
import ToDoPopupModal from '../components/ToDoPopupModal';
import '../styles/calendarPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const ToDoPage = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [currentTodo, setCurrentTodo] = useState(null); // 수정 모드에서 현재 할 일을 저장할 상태 추가

  // 할 일 목록을 백엔드에서 불러오기
  useEffect(() => {
    getTodos()
      .then((data) => {
        const formattedEvents = data.map((todo) => ({
          title: todo.title,
          date: todo.due_date,
          id: todo.id,
        }));
        setEvents(formattedEvents);
      })
      .catch((err) => console.error('Error fetching todos:', err));
  }, []);

  // 할 일 저장
  const handleSave = (updatedTodo) => {
    if (updatedTodo.id) {
      // 업데이트
      const updatedEvents = events.map((event) => 
        event.id === updatedTodo.id ? updatedTodo : event
      );
      setEvents(updatedEvents);
      updateTodo(updatedTodo.id, updatedTodo)
        .then(() => {
          setModalOpen(false);
        })
        .catch((err) => console.error('Error updating todo:', err));
    } else {
      // 새 할 일
      const newEvent = { title: updatedTodo.title, date: updatedTodo.due_date };
      setEvents([...events, newEvent]);
      addTodo(updatedTodo.title, updatedTodo.due_date)
        .then(() => {
          setModalOpen(false);
        })
        .catch((err) => console.error('Error adding todo:', err));
    }
  };

  // 날짜 클릭 시 모달 열기
  const handleDateClick = (info) => {
    setSelectedDate(info.dateStr);
    setModalOpen(true);
    setCurrentTodo(null);
  };

  // 할 일 수정 시 기존 할 일을 가져오기
  const handleEdit = (event) => {
    const todo = {
      title: event.title,
      due_date: event.start, 
      id: event.id,
    };
    setCurrentTodo(todo);
    setModalOpen(true); 
  };

  

  return (
    <div className="container mt-5" style={{ maxWidth: '900px' }}>
      <h2 className="text-center mb-4">📅 할 일 캘린더</h2>
      <Calendar events={events} dateClick={handleDateClick} handleEdit={handleEdit} />
      <ToDoPopupModal
        show={modalOpen}
        handleClose={() => setModalOpen(false)}
        handleSave={handleSave}
        date={selectedDate}
        setTitle={setNewTitle}
        currentTodo={currentTodo}
        categories={[]} 
      />
    </div>
  );
};

export default ToDoPage;
