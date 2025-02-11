import React, { useState } from 'react';
import { signup } from '../services/authService';
import SignupForm from '../components/SignupForm';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 이메일 정규식
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  // 비밀번호 정규식(8자리 이상, 대소문자, 숫자, 특수문자 포함)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
    } else if (!emailRegex.test(email)) {
      setError('유효한 이메일을 입력해주세요.');
    } else if (!passwordRegex.test(password)) {
      setError('비밀번호는 8자리 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.');
    } else if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
    } else {
      setError('');
      try {
        const response = await signup(name, email, password);
        alert('회원가입이 완료되었습니다!'); 
        setTimeout(() => navigate('/login')); 
        console.log('회원가입 성공', response);
      } catch (err) {
        setError(err.message);
        console.error('회원가입 실패', err);

      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">회원가입</h4>

          {error && <div className="alert alert-danger">{error}</div>}

          <SignupForm
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            handleSubmit={handleSubmit}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
