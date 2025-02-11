import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import Input from './Input';
import { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';

registerLocale('ko', ko);

const ToDoPopupModal = ({ show, handleClose, handleSave, date, categories = [], currentTodo }) => {
  const [title, setTitleState] = useState(currentTodo ? currentTodo.title : '');
  const [description, setDescription] = useState(currentTodo ? currentTodo.description : '');
  const [category, setCategory] = useState(currentTodo ? currentTodo.categoryId : '');
  const [priority, setPriority] = useState(currentTodo ? currentTodo.priority : 'MEDIUM');
  const [status, setStatus] = useState(currentTodo ? currentTodo.status : 'PENDING');
  const [dueDate, setDueDate] = useState(currentTodo ? new Date(currentTodo.due_date) : date ? new Date(date) : new Date());

  useEffect(() => {
    if (currentTodo) {
      setTitleState(currentTodo.title);
      setDescription(currentTodo.description);
      setCategory(currentTodo.categoryId);
      setPriority(currentTodo.priority);
      setStatus(currentTodo.status);
      setDueDate(new Date(currentTodo.due_date)); 
    }
  }, [currentTodo]);

  useEffect(() => {
    if (date) {
      setDueDate(new Date(date));  
    }
  }, [date]);

  const handleSaveClick = () => {
    const updatedTodo = {
      title,
      description,
      category,
      priority,
      status,
      due_date: dueDate.toISOString(), 
    };
    handleSave(updatedTodo);
    handleCloseClick();
  };

  const handleCloseClick = () => {
    setTitleState('');
    setDescription('');
    setCategory('');
    setPriority('MEDIUM');
    setStatus('PENDING');
    setDueDate(new Date(date));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{currentTodo ? '할 일 수정' : '할 일 추가'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        {/* 날짜 및 시간 선택 */}
        <div className="form-group mb-2">
          <label className="me-2">날짜 및 시간</label>
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            className="form-control"
            locale="ko"
          />
        </div>

        <Input
          type="text"
          value={title}
          onChange={(e) => setTitleState(e.target.value)}
          placeholder="할 일 제목"
        />
        <div className="mb-2" />
        
        {/* 설명 입력을 위한 텍스트 영역 */}
        <div className="form-group mb-2">
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            placeholder="할 일 설명"
          />
        </div>

        {/* 카테고리 선택 */}
        <div className="form-group mb-2">
          <select 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리 선택</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))
            ) : (
              <>
                <option>일상</option>
                <option>업무</option>
                <option>운동</option>
                <option>취미</option>
                <option>학습</option>
              </>
            )}
          </select>
        </div>

        {/* 우선순위 선택 */}
        <div className="form-group mb-3">
          <label>우선순위</label>
          <select 
            className="form-control" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="LOW">🌱 낮음</option>
            <option value="MEDIUM">⚖️ 보통</option>
            <option value="HIGH">🔥 높음</option>
          </select>
        </div>

        {/* 상태 선택 */}
        <div className="form-group mb-3">
          <label>상태</label>
          <select 
            className="form-control" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="IN_PROGRESS">진행 중</option>
            <option value="COMPLETED">완료</option>
            <option value="PENDING">대기 중</option>
          </select>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseClick}>
          닫기
        </Button>
        <Button variant="primary" onClick={handleSaveClick}>
          저장
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ToDoPopupModal;
