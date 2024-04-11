package com.java6.java_6_asm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.java6.java_6_asm.entities.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Cart {
    @Id
    private String cartId;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

    @Column(name = "quantity", nullable = false)
    private int quantity;

    @ManyToOne
    @JoinColumn(name = "id")
    private User user;

    @Column
    private Boolean checkPay;

    private Integer imageId;

    private Integer sizeId;

    private Integer colorId;

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

    private int voucherId;
}
