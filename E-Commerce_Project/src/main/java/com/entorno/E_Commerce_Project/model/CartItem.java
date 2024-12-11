package com.entorno.E_Commerce_Project.model;

import lombok.*;

@Setter
@Getter
public class CartItem {
    private String productId;
    private int quantity;

    // Constructor correcto
    public CartItem(String productId, int quantity) {
        this.productId = productId;
        this.quantity = quantity;
    }

    // Constructor vacío necesario para serialización (por ejemplo, con JSON)
    public CartItem() {}
    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

}
