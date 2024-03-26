package com.java6.java_6_asm.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CartSizeRequest {
    private int productId;
    private int userId;
    private int sizeId;
}
