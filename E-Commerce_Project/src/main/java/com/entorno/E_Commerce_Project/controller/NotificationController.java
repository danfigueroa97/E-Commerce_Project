package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.model.Notification;
import com.entorno.E_Commerce_Project.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Notification createNotification(@RequestBody Notification notification) {
        // Establecer la fecha actual
        notification.setDate(LocalDate.now());
        return notificationService.createNotification(notification);
    }

    @PostMapping("/sendTestNotification")
    public ResponseEntity<String> sendTestNotification() {
        try {
            // Reemplaza "UsuarioId" por el ID del usuario deseado en tu sistema
            notificationService.sendNotificationEmail("6758dbf48a8ec50e44c14fc4", "Este es un mensaje de prueba.");
            return new ResponseEntity<>("Correo electrónico de prueba enviado correctamente.", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al enviar el correo electrónico de prueba.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}