package com.example.to.entity;

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
public class ToDo {
	private int id;
	private int userId;
	private int categoryId;
	private String title;
	private String description;
	private String status;
	private LocalDateTime due_date;
	private String priority;
	private LocalDateTime createdAt;
	private LocalDateTime updatedAt;
	private int isDeleted;
}
