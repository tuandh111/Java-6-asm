package com.java6.java_6_asm.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Voucher")
public class Voucher {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer voucherId;

    @NotNull(message = "Vui lòng nhập tên voucher")
    private String voucherName;

    private String amountPercentage;

    private String type;

    private String condition;

    @Nationalized
    @Column(columnDefinition = "nvarchar(MAX)")
    private String description;

    @Temporal(TemporalType.DATE)
    private Date effectiveDate;

    @Temporal(TemporalType.DATE)
    private Date ExpirationDate;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
}
