package com.entorno.E_Commerce_Project.repository;

import com.entorno.E_Commerce_Project.model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository  extends MongoRepository<Product, String> {
    List<Product> findByCategory(String category);

}
