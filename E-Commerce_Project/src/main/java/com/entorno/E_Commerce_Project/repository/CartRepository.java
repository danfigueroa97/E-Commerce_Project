package com.entorno.E_Commerce_Project.repository;

import com.entorno.E_Commerce_Project.model.CartItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<CartItem, String> {
}
