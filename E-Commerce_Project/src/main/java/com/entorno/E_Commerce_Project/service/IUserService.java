package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.DTO.LoginDTO;
import com.entorno.E_Commerce_Project.model.User;

import java.util.List;

public interface IUserService {

    //List
    List<User> listUser();

    //List id
    User ListUsersId(String id);

    //Create
    User CreateUser(User user);

    //Update
    User UpdateUser(User user);

    //Delete
    void DeleteUser(String id);

    //Login
    User LoginUser(LoginDTO loginDTO);

}
