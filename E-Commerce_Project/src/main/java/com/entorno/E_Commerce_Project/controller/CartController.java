package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.model.CartItem;
import com.entorno.E_Commerce_Project.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getCartItems() {
        List<CartItem> items = cartService.getCartItems();
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestBody CartItem cartItem) {
        CartItem newItem = cartService.addToCart(cartItem);
        return ResponseEntity.ok(newItem);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable String productId) {
        cartService.removeFromCart(productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<CartItem> updateQuantity(@PathVariable String productId, @RequestParam int quantity) {
        CartItem updatedItem = cartService.updateQuantity(productId, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> checkout() {
        cartService.checkout();
        return ResponseEntity.ok().build();
    }
}
