package com.example.to.controller;

import com.example.demo.model.ToDo;
import com.example.demo.service.ToDoService;
import com.example.to.service.UserService;

import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todos")
@RequiredArgsConstructor
public class ToDoController {
    private final ToDoService toDoService;

    // 할 일 목록 가져오기 (GET 요청)
    @GetMapping
    public ResponseEntity<List<ToDo>> getAllToDos() {
        List<ToDo> todos = toDoService.getAllToDos();
        return new ResponseEntity<>(todos, HttpStatus.OK);
    }

    // 새 할 일 추가 (POST 요청)
    @PostMapping
    public ResponseEntity<ToDo> addToDo(@RequestBody ToDo toDo) {
        ToDo newToDo = toDoService.addToDo(toDo);
        return new ResponseEntity<>(newToDo, HttpStatus.CREATED);
    }
}