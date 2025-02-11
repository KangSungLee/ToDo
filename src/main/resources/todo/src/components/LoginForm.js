import React from 'react';
import Input from './Input';
import Button from './Button';

const LoginForm = ({ email, setEmail, password, setPassword, handleSubmit, handleLoginSuccess, error }) => {

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">이메일</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">비밀번호</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
        />
      </div>
      <Button label="로그인" onClick={handleSubmit} />
      <div className="text-center mt-3">
        <button 
          type="button" 
          className="btn btn-link" 
          onClick={handleLoginSuccess}
        >
          회원가입
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
