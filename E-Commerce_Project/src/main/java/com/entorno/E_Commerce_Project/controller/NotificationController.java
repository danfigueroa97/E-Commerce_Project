package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.model.Notification;
import com.entorno.E_Commerce_Project.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
