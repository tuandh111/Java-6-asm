package com.java6.java_6_asm.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Voucher")
public class Voucher {
    @Id
    @GeneratedValue
    private Integer voucherId;
    @NotNull(message = "Vui lòng nhập tên voucher")
    private String voucherName;

    private String amountPercentage;

    private String type;

    private String condition;

    private String description;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;
}
