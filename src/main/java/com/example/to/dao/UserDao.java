package com.example.to.dao;

import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.SelectKey;
import org.apache.ibatis.annotations.Update;

import com.example.to.entity.User;

@Mapper
public interface UserDao {

	@Select("select * from user where email=#{email}")   
	User getUserByBid(String email);
	
	@Insert("insert into user values (default, #{userName}, #{email}, #{password}, default, default)")
	void insertUser(User user);
	
	@Update("update user set userName=#{userName} email=#{email}, password=#{password} where id=#{id}")  
	void updateUser(User user);
	
	@Update("update user set isDeleted=1 where id=#{id}")
	void deleteUser(int id);
	
}