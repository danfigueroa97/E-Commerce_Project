package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.QR;
import com.entorno.E_Commerce_Project.repository.QRRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.util.Optional;

@Service
public class QRService {

    @Autowired
    private QRRepository qrRepository;

    /**
     * Genera el contenido del QR en formato PNG.
     *
     * @param content Contenido del QR.
     * @return QR en formato PNG como arreglo de bytes.
     */
    public String generateQRContent(String content) {
        try {
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 200, 200);
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            MatrixToImageWriter.writeToStream(bitMatrix, "PNG", outputStream);
            return java.util.Base64.getEncoder().encodeToString(outputStream.toByteArray());
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate QR content", e);
        }
    }

    /**
     * Genera y guarda un QR asociado a una compra.
     *
     * @param buyId ID de la compra asociada.
     * @return Documento QR generado.
     */
    public QR generateQR(String buyId) {
        // Crear el contenido del QR.
        String content = "Compra ID: " + buyId; // Agregar más información según sea necesario.
        String qrContent = generateQRContent(content);

        // Crear el objeto QR.
        QR qr = new QR();
            qr.setBuyId(buyId);
            qr.setQrContent(qrContent);

        // Guardar el QR en la base de datos.
        return qrRepository.save(qr);
    }

    /**
     * Obtiene un QR por su ID.
     *
     * @param id ID del QR en MongoDB.
     * @return Documento QR si existe.
     */
    public Optional<QR> getQRById(String id) {
        return qrRepository.findById(id);
    }
}
