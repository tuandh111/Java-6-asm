package com.java6.java_6_asm.entities.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer discountId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "productId")
    private Product product;

    @Column
    @NotNull(message = "Vui lòng nhập giảm giá")
    @Min(value = 0, message = "Số lượng phải lớn 0")
    private double discountedPrice;

    @Column
    private boolean status;

}
