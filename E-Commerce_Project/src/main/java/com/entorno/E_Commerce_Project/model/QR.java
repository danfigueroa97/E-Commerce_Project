package com.entorno.E_Commerce_Project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "qrcode")

public class QR {

    @Id
    private String id;
    private String qrContent;
    private String buyId;
    public void associateBuy(String buyId) {
        this.buyId = buyId;
    }
}