package com.java6.java_6_asm.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.java6.java_6_asm.entities.product.Product;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentId;

    @Column
    private double price;

    @Column
    private double quantity;

    @Temporal(TemporalType.DATE)
    @Column(name = "createAt")
    private Date createAt = new Date();

    @ManyToOne
    @JoinColumn(name = "orderId")
    private Order order;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "productId")
    private Product productID;

}
