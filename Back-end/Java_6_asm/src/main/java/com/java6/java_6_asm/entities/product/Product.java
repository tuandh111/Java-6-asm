package com.java6.java_6_asm.entities.product;

import com.java6.java_6_asm.entities.*;
import com.java6.java_6_asm.entities._enum.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "product")
@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productId;

    @Nationalized
    @NotNull(message = "Vui lòng nhập tên sản phẩm")
    private String productName;

    private Boolean isActive;

    @Temporal(TemporalType.DATE)
    private Date createDate = new Date();

    @Temporal(TemporalType.DATE)
    private Date deleteDate;

    @NotNull(message = "Vui lòng nhập số lượng trong kho")
    @Min(value = 0, message = "Số lượng phải lớn 0")
    @Digits(integer = 32, fraction = 0, message = "Số lượng phải là số nguyên")
    private Integer quantityInStock;

    @NotNull(message = "Vui lòng nhập số lượng trong kho")
    @Min(value = 0, message = "Số lượng phải lớn 0")
    private Double price;


    @Nationalized
    @Column(columnDefinition = "nvarchar(MAX)")
    private String description;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @OneToMany(mappedBy = "productId")
    private List<Favorites> favorites;

    @ManyToOne
    @JoinColumn(name = "brandId")
    private Brand brand;

    @OneToMany(mappedBy = "productImageId")
    private List<ProductImage> productImages;

    @OneToMany(mappedBy = "detailsColorId")
    private List<DetailsColor> detailsColors;

    @OneToMany(mappedBy = "detailsSizeId")
    private List<DetailsSize> detailsSizes;

    @OneToMany(mappedBy = "cartId")
    private List<Cart> cart;
}
