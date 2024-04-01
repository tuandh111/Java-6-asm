package com.java6.java_6_asm.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DetailsQuantityRequest {
    private Integer detailsColorId;
    private Integer detailsSizeId;
    private double specialPrice;
    private int quantity;
    private Integer productId;
}
