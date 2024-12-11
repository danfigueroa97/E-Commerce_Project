package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.DTO.LoginDTO;
import com.entorno.E_Commerce_Project.ENUM.Role;
import com.entorno.E_Commerce_Project.model.Product;
import com.entorno.E_Commerce_Project.model.User;
import com.entorno.E_Commerce_Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> listUser() {
        return userRepository.findAll();
    }

    @Override
    public User ListUsersId(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User CreateUser(User user) {
        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }
        return userRepository.save(user);
    }

    @Override
    public User UpdateUser(User user) {

        Optional<User> userExists = userRepository.findById(user.getId());
        if(userExists.isPresent()) {
            User userUpdate = userExists.get();

            userUpdate.setUsername(user.getUsername());
            userUpdate.setPassword(user.getPassword());
            userUpdate.setEmail(user.getEmail());
            userUpdate.setAddress(user.getAddress());
            userUpdate.setRole(user.getRole());

            return userRepository.save(userUpdate);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    @Override
    public void DeleteUser(String id) {
        if(userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    @Override
    public User LoginUser(LoginDTO loginDTO) {
        String usermane = loginDTO.getUsername();
        String password = loginDTO.getPassword();
        Role role = loginDTO.getRole();

        Optional<User> userOptional = userRepository.findByusername(usermane);

        if (userOptional.isPresent()){
            User user = userOptional.get();
            if (user.getRole() == role && Objects.equals(user.getPassword(), password)){
                return user;
            } else {
                throw new IllegalArgumentException("Incorrect role or password");
            }
        } else {
            throw new IllegalArgumentException("Incorrect username");
        }
    }

}
