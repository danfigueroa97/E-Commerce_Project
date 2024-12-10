package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.model.Product;
import com.entorno.E_Commerce_Project.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/list")
    private List<Product> productList(){
        return productService.ListAllProducts();
    }

    @PostMapping("/create")
    private Product create(@RequestBody Product product){
        return productService.createProduct(product);
    }

    @PutMapping("/update")
    private Product update(@RequestBody Product product){
        return productService.updateProduct(product);
    }

    @DeleteMapping("/delete/{id}")
    private ResponseEntity<Void> delete(@PathVariable String id){
        try {
            productService.deleteProduct(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
