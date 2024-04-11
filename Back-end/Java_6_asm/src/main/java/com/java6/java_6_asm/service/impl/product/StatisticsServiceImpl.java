package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.service.service.product.StatisticsService;
import org.hibernate.stat.internal.StatisticsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StatisticsServiceImpl implements StatisticsService {
    @Autowired
    OrderRepository orderRepository;
    @Override
    public Map<String, Double> dataRevenueByMonth() {
        Map<String, Double> dataRevenueByMonth = new HashMap<>();
        List<Object[]> datas = orderRepository.dataRevenueByMonth();
        for (Object[] data:datas){
            Integer month = (Integer) data[0];
            Double amount= (Double) data[1];
            dataRevenueByMonth.put(month+"",amount);
        }
        return dataRevenueByMonth;
    }

    @Override
    public Map<String, Double> dataRevenueByProduct() {
        Map<String, Double> dataRevenueByProduct = new HashMap<>();
        List<Object[]> datas = orderRepository.dataRevenueByProduct();
        System.out.println(datas.toString());
        for (Object[] data:datas){
            Integer prodId = (Integer) data[0];
            Double amount= (Double) data[1];
            dataRevenueByProduct.put(prodId+"",amount);
        }
        return dataRevenueByProduct;
    }

    @Override
    public List<Object[]> dataRevenueByBrand() {
        return null;
    }
}
