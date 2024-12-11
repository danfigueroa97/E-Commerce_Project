package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.QR;
import com.entorno.E_Commerce_Project.repository.QRRepository;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Optional;

@Service
public class QRService {

    @Autowired
    private QRRepository qrRepository;

    /**
     * Genera el contenido del QR en formato Base64.
     *
     * @param content Contenido del QR.
     * @return QR en formato Base64.
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

        // Verificar si ya existe un QR para esta compra
        Optional<QR> existingQR = qrRepository.findOneByBuyId(buyId);
        if (existingQR.isPresent()) {
            QR existing = existingQR.get();
            existing.setQrContent(qrContent); // Actualizar el contenido del QR
            return qrRepository.save(existing);
        }

        // Crear el objeto QR.
        QR qr = new QR();
        qr.setBuyId(buyId);
        qr.setQrContent(qrContent);

        // Guardar el QR en la base de datos.
        return qrRepository.save(qr);
    }
    public byte[] generateQRImage(String content) throws IOException {
        QRCodeWriter qrCodeWriter = new QRCodeWriter();
        try {
            BitMatrix bitMatrix = qrCodeWriter.encode(content, BarcodeFormat.QR_CODE, 250, 250);
            BufferedImage bufferedImage = MatrixToImageWriter.toBufferedImage(bitMatrix);

            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            ImageIO.write(bufferedImage, "png", outputStream);
            return outputStream.toByteArray();
        } catch (Exception e) {
            throw new IOException("Error al generar la imagen QR.", e);
        }
    }

    public Optional<QR> getQRByBuyId(String buyId) {
        return qrRepository.findOneByBuyId(buyId);
    }

}
