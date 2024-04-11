package com.java6.java_6_asm.controller.product;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.service.service.product.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class StatisticsController {
    @Autowired
    private ObjectMapper objectMapper;
    @Autowired
    private StatisticsService statisticsService;
    private OrderRepository orderRepository;

//    @GetMapping("/auth/statistics/month")
//    public ResponseEntity<?> getDataRevenueByMonth() throws JsonProcessingException {
//        try {
//            String dataRevenueByMonthJson = objectMapper.writeValueAsString(statisticsService.dataRevenueByMonth());
//            System.out.println("dataRevenueByMonthJson: " + dataRevenueByMonthJson);
//            return ResponseEntity.ok(dataRevenueByMonthJson);
//        } catch (JsonProcessingException e) {
//            e.printStackTrace();
//            String errorMessage="Lỗi lấy dữ liệu";
//            return ResponseEntity.badRequest().body(objectMapper.writeValueAsString(errorMessage));
//        }
//    }

    @GetMapping("/management/twobee/statistics/month")
    public Map<String, Double> getDataRevenueByMonth(){
        //System.out.println(statisticsService.dataRevenueByMonth());
        return statisticsService.dataRevenueByMonth();
    }
    @GetMapping("/management/twobee/statistics/product")
    public Map<String, Double> getDataRevenueByProduct(){
        //System.out.println(statisticsService.dataRevenueByMonth());
        return statisticsService.dataRevenueByProduct();
    }
}
