package com.example.to.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.to.dao.UserDao;
import com.example.to.entity.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor   
public class UserServiceImpl implements UserService{
	private final UserDao userDao;
	private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

	@Override
	public User getUserByBid(String email) {
		return userDao.getUserByBid(email);
	}

	@Override
	public void insertUser(User user) {
		User userDb = getUserByBid(user.getEmail());
		
		// email 중복 확인
		if (userDb != null) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }
		
		// 비밀번호 암호화
		user.setPassword(passwordEncoder.encode(user.getPassword()));
        userDao.insertUser(user);
	}

	@Override
	public void updateUser(User user) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteUser(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void userLogin(User user) {
		User userDb = getUserByBid(user.getEmail());
		
		// email 존재 여부
		if (userDb == null) {
            throw new IllegalArgumentException("존재하지 않는 이메일입니다.");
        }
		
		// 비밀번호 검증
		if (!passwordEncoder.matches(user.getPassword(), userDb.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
		
		logger.info("로그인 성공: " + userDb.getEmail());
	}
	
	
}