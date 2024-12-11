package com.entorno.E_Commerce_Project.repository;

import com.entorno.E_Commerce_Project.model.Cart;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends MongoRepository<Cart, String> {
    Cart findByUserId(String userId); // Buscar el carrito de un usuario específico
}
