package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.DTO.LoginDTO;
import com.entorno.E_Commerce_Project.model.User;
import com.entorno.E_Commerce_Project.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/list/{id}")
    public User listId(@PathVariable String id) {
        return userService.ListUsersId(id);
    }

    @PostMapping("/create")
    public User create(@RequestBody User user) {
        return userService.CreateUser(user);
    }

    @PutMapping("/update")
    public User update(@RequestBody User user) {
        return userService.UpdateUser(user);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        try {
            userService.DeleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody LoginDTO loginDTO) {
        try {
            User user = userService.LoginUser(loginDTO);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

}
