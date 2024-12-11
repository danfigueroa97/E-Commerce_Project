package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.CartItem;
import com.entorno.E_Commerce_Project.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<CartItem> getCartItems() {
        return cartRepository.findAll();
    }

    public CartItem addToCart(CartItem cartItem) {
        return cartRepository.save(cartItem);
    }

    public void removeFromCart(String productId) {
        cartRepository.deleteById(productId);
    }

    public CartItem updateQuantity(String productId, int quantity) {
        Optional<CartItem> optionalItem = cartRepository.findById(productId);
        if (optionalItem.isPresent()) {
            CartItem item = optionalItem.get();
            item.setQuantity(quantity);
            return cartRepository.save(item);
        }
        return null; // Or throw an exception
    }

    public void checkout() {
        // Aquí implementas la lógica para generar el código QR y enviar la notificación
        // Al final, vacía el carrito
        cartRepository.deleteAll();
    }
}
