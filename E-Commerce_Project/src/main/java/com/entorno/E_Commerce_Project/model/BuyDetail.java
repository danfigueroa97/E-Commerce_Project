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
@Document(collation = "buydetail")
public class BuyDetail {

    @Id
    private String id;

    private String idUser;
    private String idProduct;
    private String totalPrice;
    private String description;
    public String payMethod;
}
