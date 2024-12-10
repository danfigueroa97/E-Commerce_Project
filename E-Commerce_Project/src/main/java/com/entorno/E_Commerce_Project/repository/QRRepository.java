package com.entorno.E_Commerce_Project.repository;

import com.entorno.E_Commerce_Project.model.QR;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QRRepository extends MongoRepository<QR, Integer> {
}