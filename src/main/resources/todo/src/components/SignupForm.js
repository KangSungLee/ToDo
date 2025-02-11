import React from 'react';
import Input from './Input';  
import Button from './Button';  

const SignupForm = ({ 
  name, setName, 
  email, setEmail, 
  password, setPassword, 
  confirmPassword, setConfirmPassword, 
  handleSubmit, error 
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">이름</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="이름을 입력하세요"
        />
      </div>
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
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">비밀번호 확인</label>
        <Input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="비밀번호를 다시 입력하세요"
        />
      </div>
      <Button label="회원가입" />
    </form>
  );
};

export default SignupForm;
