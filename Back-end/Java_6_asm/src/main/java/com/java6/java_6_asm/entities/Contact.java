package com.java6.java_6_asm.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Contact")
@JsonIgnoreProperties
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer contactId;
    
    @Nationalized
    @NotNull(message = "Vui lòng nhập địa chỉ")
    private String addressName;

    @NotNull(message = "Vui lòng nhập số điện thoại")
    private String numberPhone;

    private Boolean isActive;

    private  Boolean isMessage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId")
    private User user;
}
