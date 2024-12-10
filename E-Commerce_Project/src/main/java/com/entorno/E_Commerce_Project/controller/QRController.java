package com.entorno.E_Commerce_Project.controller;

import com.entorno.E_Commerce_Project.model.QR;
import com.entorno.E_Commerce_Project.service.QRService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/qr")
public class QRController {

    @Autowired
    private QRService qrService;

    @PostMapping("/generate")
    public ResponseEntity<QR> generateQR(@RequestParam String buyId) {
        try {
            QR qr = qrService.generateQR(buyId);
            return new ResponseEntity<>(qr, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<QR> getQRById(@PathVariable String id) {
        return qrService.getQRById(id)
                .map(qr -> new ResponseEntity<>(qr, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
