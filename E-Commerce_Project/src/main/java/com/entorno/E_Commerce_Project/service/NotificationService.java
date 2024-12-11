package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.Notification;
import com.entorno.E_Commerce_Project.model.User;
import com.entorno.E_Commerce_Project.repository.NotificationRepository;
import com.entorno.E_Commerce_Project.repository.UserRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private QRService qrService;

    public Notification createNotification(Notification notification) {
        // Guardar la notificación en la base de datos
        Notification savedNotification = notificationRepository.save(notification);

        // Enviar la notificación por correo electrónico
        sendNotificationEmail(notification.getUserId(), notification.getMessage());

        return savedNotification;
    }

    private String getUserEmailById(String userId) {
        // Reemplaza 'userRepository' con el nombre de tu repositorio de usuarios
        Optional<User> optionalUser = userRepository.findById(userId); // Asumiendo que tienes un repositorio de usuarios

        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            return user.getEmail(); // Reemplaza 'getEmail()' con el método correspondiente para obtener el correo del usuario
        } else {
            System.err.println("No se pudo encontrar el usuario con ID: " + userId);
            return null;
        }
    }

    public void sendNotificationEmail(String userId, String message) {
        // Aquí debes obtener el correo del usuario desde tu base de datos o contexto de sesión
        String userEmail = getUserEmailById(userId); // Reemplázalo con la lógica para obtener el email del usuario

        if (userEmail != null && !userEmail.isEmpty()) {
            SimpleMailMessage email = new SimpleMailMessage();
            email.setFrom("cristianexclusivo1@gmail.com"); // Correo desde el que se envía
            email.setTo(userEmail); // Dirección de correo del usuario destinatario
            email.setSubject("Nueva Notificación");
            email.setText(message);

            // Enviar el correo electrónico
            javaMailSender.send(email);

            System.out.println("Correo enviado desde: " + email.getFrom());
            System.out.println("Correo enviado a: " + email.getTo()[0]); // Asumiendo que hay un solo destinatario
        } else {
            System.err.println("No se pudo encontrar el correo del usuario con ID: " + userId);
        }
    }
    public void sendNotificationEmailWithQR(String userEmail, String message, String qrContent) throws MessagingException, IOException {
        // Generar la imagen QR como bytes
        byte[] qrImage = qrService.generateQRImage(qrContent);

        // Crear el mensaje de correo electrónico
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(userEmail);
        helper.setSubject("Tu Código QR");
        helper.setText(message);

        // Adjuntar la imagen QR
        helper.addAttachment("qr-code.png", new ByteArrayResource(qrImage));

        // Enviar el correo
        javaMailSender.send(mimeMessage);
    }
}


