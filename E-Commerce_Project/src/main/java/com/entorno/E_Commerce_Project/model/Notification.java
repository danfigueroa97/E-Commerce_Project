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
@Document(collation = "notification")
public class Notification {

    @Id
    private String id;

    private String idNotification;
    private String message;
    private String idUser;

}
