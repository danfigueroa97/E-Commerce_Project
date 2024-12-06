package com.entorno.E_Commerce_Project.repository;

import com.entorno.E_Commerce_Project.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
