package com.java6.java_6_asm.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.annotations.Nationalized;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.w3c.dom.stylesheets.LinkStyle;

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
    private List<Product> products ;

}
