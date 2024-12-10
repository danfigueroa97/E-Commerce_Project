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
<<<<<<< Updated upstream:E-Commerce_Project/src/main/java/com/entorno/E_Commerce_Project/model/QRCode.java
public class QRCode {
=======
public class QR {
>>>>>>> Stashed changes:E-Commerce_Project/src/main/java/com/entorno/E_Commerce_Project/model/QR.java

    @Id
    private String id;
    private String qrContent;
    private String buyId;
    public void associateBuy(String buyId) {
        this.buyId = buyId;
    }
}
