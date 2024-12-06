package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.User;
import com.entorno.E_Commerce_Project.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserService implements IUserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User ListUsersId(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User CreateUser(User user) {
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
            userUpdate.setAddress(userUpdate.getAddress());

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
}
