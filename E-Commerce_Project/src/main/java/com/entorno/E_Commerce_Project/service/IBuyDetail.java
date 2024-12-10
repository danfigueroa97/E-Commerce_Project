package com.entorno.E_Commerce_Project.service;

import com.entorno.E_Commerce_Project.model.BuyDetail;
import java.util.List;
import java.util.Optional;


public interface IBuyDetail {

    BuyDetail createBuyDetail(BuyDetail buyDetail);

    List<BuyDetail> listAllBuyDetails();

    Optional<BuyDetail> getBuyDetailById(String id);

    BuyDetail updateBuyDetail(String id, BuyDetail buyDetail);

    void deleteBuyDetail(String id);
}
