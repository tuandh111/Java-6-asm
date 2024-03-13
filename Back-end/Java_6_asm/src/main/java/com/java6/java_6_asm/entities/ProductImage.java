package com.java6.java_6_asm.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jdk.jfr.Enabled;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "productImage")
public class ProductImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productImageId;

    @Nationalized
    @NotNull(message = "Vui lòng nhập ảnh")
    private String imageName;

    @ManyToOne
    @JoinColumn(name = "productId")
    private  Product product;
}
