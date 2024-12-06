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
@Document(collation = "user")
public class User {

    @Id
    private String id;

    private String idUser;
    private String username;
    private String password;
    private String email;
    private String address;

}
