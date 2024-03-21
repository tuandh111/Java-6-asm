package com.java6.java_6_asm.entities.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "brand")
public class Brand {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer brandId;

    @Nationalized
    @NotNull(message = "Vui lòng nhập thương hiệu")
    private String nameBrand;

    private Boolean isActive;

    @OneToMany(mappedBy = "productId")
    @JsonIgnore
    private List<Product> products;

}
