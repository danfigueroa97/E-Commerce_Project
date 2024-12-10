package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.Product;
import com.entorno.E_Commerce_Project.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService implements IProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Product> ListAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        Optional<Product> optionalExist = productRepository.findById(product.getId());

        if(optionalExist.isPresent()){
            Product productUpdate = optionalExist.get();

            productUpdate.setName(product.getName());
            productUpdate.setCategory(product.getCategory());
            productUpdate.setStock(productUpdate.getStock());
            productUpdate.setPrice(product.getPrice());
            productUpdate.setImage(productUpdate.getImage());

            return productRepository.save(productUpdate);
        } else {
            throw new IllegalArgumentException("Product not found");
        }
    }

    @Override
    public void deleteProduct(String id) {

        if (productRepository.existsById(id)){
            productRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("Product not found");
        }

    }
}
