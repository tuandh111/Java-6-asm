package com.java6.java_6_asm.entities.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "detailsSize")
public class DetailsSize {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer detailsSizeId;

    @Temporal(TemporalType.DATE)
    private Date createDate = new Date();

    @ManyToOne
    @JoinColumn(name = "sizeId")
    private Size size;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product product;

//    @OneToMany(mappedBy = "detailsQuantityId")
//    @JsonIgnore
//    private List<DetailsQuantity> detailsQuantities;
    
}
