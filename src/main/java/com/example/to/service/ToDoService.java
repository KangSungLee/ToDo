package com.example.to.service;

import com.example.to.entity.User;

public interface ToDoService {
	
	User getUserByBid(String email);   
	
	void insertUser(User user); 
	
	void updateUser(User user); 
	
	void deleteUser(int id);
	
	void userLogin(User user);
}