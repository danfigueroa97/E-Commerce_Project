package com.entorno.E_Commerce_Project.model;

import lombok.Data;

@Data
public class CartItem {
    private String productId;
    private int quantity;

    public CartItem(String productId, int quantity) {
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
