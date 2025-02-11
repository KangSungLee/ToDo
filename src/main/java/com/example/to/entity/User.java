package com.example.to.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder 
public class User {
	private int id;
	private String userName;
	private String email;
	private String password;
	private LocalDateTime createdAt;
	private int isDeleted;
}
