package com.java6.java_6_asm.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PaymentRequest {

    private String[] cartId;
    private int userId;
    private int contactId;
    private double totalAmount;
    private String payments;
}
