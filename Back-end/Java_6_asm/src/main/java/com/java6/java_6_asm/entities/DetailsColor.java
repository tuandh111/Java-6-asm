package com.java6.java_6_asm.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class DetailsColor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detailsColorId;

    @Temporal(TemporalType.DATE)
    private Date createDate= new Date();

    @ManyToOne
    @JoinColumn(name = "colorId")
    private Color color;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;
}
