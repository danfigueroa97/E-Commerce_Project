package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.Notification;
import com.entorno.E_Commerce_Project.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        // Guardar la notificación en la base de datos
        Notification savedNotification = notificationRepository.save(notification);

        // Enviar la notificación por correo electrónico
        sendNotificationEmail(notification.getUserId(), notification.getMessage());

        return savedNotification;
    }

    private void sendNotificationEmail(String userId, String message) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo("usuarioDestinatario@gmail.com"); // Aquí deberías usar el email del usuario destinatario
        email.setSubject("Nueva Notificación");
        email.setText(message);
        javaMailSender.send(email);
    }
}
