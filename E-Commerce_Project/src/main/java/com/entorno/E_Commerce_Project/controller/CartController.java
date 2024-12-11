package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.model.Cart;
import com.entorno.E_Commerce_Project.model.CartItem;
import com.entorno.E_Commerce_Project.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping("/items")
    public ResponseEntity<List<CartItem>> getCartItems(@RequestParam String userId) {
        List<CartItem> items = cartService.getCartItems(userId);
        return ResponseEntity.ok(items);
    }

    @PostMapping("/add")
    public ResponseEntity<CartItem> addToCart(@RequestParam String userId, @RequestBody CartItem cartItem) {
        CartItem newItem = cartService.addToCart(userId, cartItem);
        return ResponseEntity.ok(newItem);
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(@RequestParam String userId, @PathVariable String productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{productId}")
    public ResponseEntity<CartItem> updateQuantity(@RequestParam String userId, @PathVariable String productId, @RequestParam int quantity) {
        CartItem updatedItem = cartService.updateQuantity(userId, productId, quantity);
        return ResponseEntity.ok(updatedItem);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Void> checkout(@RequestParam String userId) {
        cartService.checkout(userId);
        return ResponseEntity.ok().build();
    }
}
