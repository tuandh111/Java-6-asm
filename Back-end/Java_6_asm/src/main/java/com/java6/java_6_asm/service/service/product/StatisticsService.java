package com.java6.java_6_asm.service.service.product;

import java.util.List;
import java.util.Map;

public interface StatisticsService {

    Map<String, Double> dataRevenueByMonth();
    Map<String, Double> dataRevenueByProduct();
    List<Object[]> dataRevenueByBrand();
}
