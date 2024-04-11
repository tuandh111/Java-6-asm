package com.java6.java_6_asm.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "_order")
public class Order {
    @Id
    private String orderId;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "createAt")
    private Date createAt = new Date();

    @Column
    private double totalAmount;

    @Nationalized
    private String note;

    @Nationalized
    private String status;

    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

    @OneToMany(mappedBy = "cartId")
    @JsonIgnore
    private List<Cart> carts;

    private Integer contactId;

    private String Payments;

    private int idVoucher;

}
