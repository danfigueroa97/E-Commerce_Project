package com.entorno.E_Commerce_Project.controller;


import com.entorno.E_Commerce_Project.model.BuyDetail;
import com.entorno.E_Commerce_Project.service.BuyDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buydetail")
public class BuyDetailController {

    @Autowired
    private BuyDetailService buyDetailService;

    @PostMapping("/create")
    public ResponseEntity<BuyDetail> createBuyDetail(@RequestBody BuyDetail buyDetail) {
        try {
            BuyDetail createdBuyDetail = buyDetailService.createBuyDetail(buyDetail);
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
