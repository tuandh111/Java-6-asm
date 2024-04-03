package com.java6.java_6_asm.model.request;

import com.java6.java_6_asm.entities.product.Product;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.Min;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class DiscountRequest {
    private int productId;

    private double discountedPrice;

    private boolean status;
}
