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
    private String selectedBrand;////product
    private Double price; //product
    private String description;
    private List<String> images;//product image

    private double discount;//discount

    private String selectedColor;//detail Color

    private String selectedSize;//detail size

    private int quantityInStock;//details quantity

}
