package com.entorno.E_Commerce_Project.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "carts")
public class Cart {
    @Id
    private String id;
    private String userId;
    private List<CartItem> items;

    // Constructor, getters, y setters
}