package com.entorno.E_Commerce_Project.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "notification")
public class Notification {

    @Id
    private String id;
    private LocalDate date;
    private String message;
    private String userId;

    public Notification(LocalDate date, String message, String userId) {
        this.date = date;
        this.message = message;
        this.userId = userId;
    }
}
