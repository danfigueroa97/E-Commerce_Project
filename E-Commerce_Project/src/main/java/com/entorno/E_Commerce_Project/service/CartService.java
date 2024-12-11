package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.Cart;
import com.entorno.E_Commerce_Project.model.CartItem;
import com.entorno.E_Commerce_Project.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    public List<CartItem> getCartItems(String userId) {
        Cart cart = cartRepository.findByUserId(userId);
        return (cart != null) ? cart.getItems() : new ArrayList<>();
    }


    public CartItem addToCart(String userId, CartItem cartItem) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            cart = new Cart();
            cart.setUserId(userId);
            cart.setItems(new ArrayList<>());
        }

        // Verificar si el producto ya está en el carrito y actualizar la cantidad
        boolean itemExists = false;
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(cartItem.getProductId())) {
                item.setQuantity(item.getQuantity() + cartItem.getQuantity());
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            cart.getItems().add(cartItem);
        }

        cartRepository.save(cart);
        return cartItem;
    }


    public void removeFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            cart.getItems().removeIf(item -> item.getProductId().equals(productId));
            cartRepository.save(cart);
        }
    }

    public CartItem updateQuantity(String userId, String productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            for (CartItem item : cart.getItems()) {
                if (item.getProductId().equals(productId)) {
                    item.setQuantity(quantity);
                    cartRepository.save(cart);
                    return item;
                }
            }
        }
        return null;
    }


    public void checkout(String userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart != null) {
            cart.getItems().clear(); // Vacía el carrito
            cartRepository.save(cart);
            // Aquí puedes implementar lógica para QR y notificaciones
        }
    }
}
