package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.Product;

import java.util.List;

public interface IProductService {

    //List
    List<Product> ListAllProducts();

    //Create
    Product createProduct(Product product);

    //Update
    Product updateProduct(Product product);

    //Delete
    void deleteProduct(String id);

    //List category
    List<Product> ListCategory(String category);

}
