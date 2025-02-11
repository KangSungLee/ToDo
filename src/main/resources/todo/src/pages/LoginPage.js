import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 이메일 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 비밀번호 정규식(8자리 이상, 대소문자, 숫자, 특수문자 포함)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('이메일과 비밀번호를 모두 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      setError('유효한 이메일을 입력해주세요.');
    } else if (!passwordRegex.test(password)) {
      setError('비밀번호는 8자리 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.');
    } else {
      try {
        await login(email, password);
        alert('로그인 성공!');
        navigate('/home');  
        window.location.reload();
      } catch (err) {
        alert(err.message);        
      }
      setError('');
    }
    
  };

  const handleLoginSuccess = () => {
    navigate('/signup');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">로그인</h4>
          {/* 에러 메시지 */}
          {error && <div className="alert alert-danger">{error}</div>}
          <LoginForm
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleSubmit={handleSubmit}
            handleLoginSuccess={handleLoginSuccess}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
