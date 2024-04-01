package com.java6.java_6_asm.entities.product;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "details_quantity")
public class DetailsQuantity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detailsQuantityId;

    private double SpecialPrice;

    private int quantity;

    @ManyToOne
    @JoinColumn(name = "productId")
    private  Product productId;

//    @ManyToOne
//    @JoinColumn(name = "detailsColorId")
//    private  DetailsColor detailsColorId;
//
    private Integer detailsColorId;

    private  Integer detailsSizeId;
//    @ManyToOne
//    @JoinColumn(name = "detailsSizeId")
//    private DetailsSize detailsSizeId;
}
