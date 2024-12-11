package com.entorno.E_Commerce_Project.controller;


import com.entorno.E_Commerce_Project.ENUM.PayMethod;
import com.entorno.E_Commerce_Project.model.BuyDetail;
import com.entorno.E_Commerce_Project.model.Notification;
import com.entorno.E_Commerce_Project.model.QR;
import com.entorno.E_Commerce_Project.service.BuyDetailService;
import com.entorno.E_Commerce_Project.service.NotificationService;
import com.entorno.E_Commerce_Project.service.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/buydetail")
public class BuyDetailController {

    @Autowired
    private BuyDetailService buyDetailService;

    @Autowired
    private QRService qrService;

    @Autowired
    private NotificationService notificationService;
    @PostMapping("/create")
    public ResponseEntity<BuyDetail> createBuyDetail(@RequestBody BuyDetail buyDetail) {
        try {
            // 1. Crear la compra
            BuyDetail createdBuyDetail = buyDetailService.createBuyDetail(buyDetail);

            // 2. Generar el QR asociado a la compra si es método de pago virtual
            if (buyDetail.getPayMethod().equals(PayMethod.VIRTUAL)) {
                QR qr = qrService.generateQR(createdBuyDetail.getId());

                // 3. Enviar notificación al usuario
                Notification notification = new Notification(LocalDate.now(),
                        "Su compra ha sido registrada. Código QR generado: " + qr.getQrContent(),
                        createdBuyDetail.getIdUser());
                notificationService.createNotification(notification);
            } else {
                // Solo se envía el email sin el QR si es compra presencial
                Notification notification = new Notification(LocalDate.now(),
                        "Su compra ha sido registrada.",
                        createdBuyDetail.getIdUser());
                notificationService.createNotification(notification);
            }

            return new ResponseEntity<>(createdBuyDetail, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/{id}")
    public ResponseEntity<BuyDetail> getBuyDetailById(@PathVariable String id) {
        return buyDetailService.getBuyDetailById(id)
                .map(buyDetail -> new ResponseEntity<>(buyDetail, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/list")
    public ResponseEntity<List<BuyDetail>> listAllBuyDetails() {
        try {
            List<BuyDetail> buyDetails = buyDetailService.listAllBuyDetails();
            if (buyDetails.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(buyDetails, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBuyDetail(@PathVariable String id) {
        try {
            buyDetailService.deleteBuyDetail(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
