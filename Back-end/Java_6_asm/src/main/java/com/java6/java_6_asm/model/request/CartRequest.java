package com.java6.java_6_asm.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CartRequest {
    private int quantity;
    private int productId;
    private int userId;
    private int colorId;
    private int sizeId;
    private int imageId;

}
