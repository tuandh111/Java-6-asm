package com.java6.java_6_asm.model.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private Integer productId;
    private String nameProduct;//product
    private Boolean isActive;////product
    private String selectedBrandId;////product
    private Double price; //product

    private List<String> images;//product image

    private double discountedPrice;//discount

    private String selectedColorId;//detail Color

    private String selectedSizeId;//detail size

    private int quantityInStock;//details quantity
}
