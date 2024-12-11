package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.ENUM.PayMethod;
import com.entorno.E_Commerce_Project.model.BuyDetail;
import com.entorno.E_Commerce_Project.repository.BuyDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import java.util.List;

@Service
public class BuyDetailService implements IBuyDetail {

    @Autowired
    private BuyDetailRepository buyDetailRepository;

    @Autowired
    private QRService qrService;

    @Autowired
    public BuyDetailService(BuyDetailRepository buyDetailRepository) {
        this.buyDetailRepository = buyDetailRepository;
    }

    @Override
    public BuyDetail createBuyDetail(BuyDetail buyDetail) {
        // Guardar la compra en la base de datos
        BuyDetail savedBuyDetail = buyDetailRepository.save(buyDetail);

        // Verificar si el método de pago es virtual antes de generar el QR
        if (PayMethod.VIRTUAL.equals(savedBuyDetail.getPayMethod())) {
            // Generar el QR asociado solo después de que la compra se haya guardado en la base de datos
            qrService.generateQR(savedBuyDetail.getId());
        }

        return savedBuyDetail;
    }
    @Override
    public List<BuyDetail> listAllBuyDetails() {
        return buyDetailRepository.findAll();
    }

    @Override
    public Optional<BuyDetail> getBuyDetailById(String id) {
        return buyDetailRepository.findById(id);
    }

    @Override
    public BuyDetail updateBuyDetail(String id, BuyDetail buyDetail) {
        return buyDetailRepository.findById(id)
                .map(existingBuyDetail -> {
                    existingBuyDetail.setIdUser(buyDetail.getIdUser());
                    existingBuyDetail.setIdProduct(buyDetail.getIdProduct());
                    existingBuyDetail.setTotalPrice(buyDetail.getTotalPrice());
                    existingBuyDetail.setDescription(buyDetail.getDescription());
                    existingBuyDetail.setPayMethod(buyDetail.getPayMethod());
                    return buyDetailRepository.save(existingBuyDetail);
                })
                .orElseThrow(() -> new RuntimeException("BuyDetail not found with id: " + id));
    }

    @Override
    public void deleteBuyDetail(String id) {
        if (buyDetailRepository.existsById(id)) {
            buyDetailRepository.deleteById(id);
        } else {
            throw new RuntimeException("BuyDetail not found with id: " + id);
        }
    }
}
