package com.java6.java_6_asm.model.request;

import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities._enum.Type;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
@Getter
@Setter
@Builder
public class VoucherRequest {
    private String voucherName;

    private String amountPercentage;

    private Type type;

    private String event;

    private String condition;

    private String description;

    private Date effectiveDate;

    private Date ExpirationDate;

    private Integer userId;
}
