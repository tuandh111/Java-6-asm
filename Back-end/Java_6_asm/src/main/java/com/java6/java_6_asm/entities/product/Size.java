package com.java6.java_6_asm.entities.product;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "size")
public class Size {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sizeId;

    @Nationalized
    @NotNull(message = "Vui lòng chọn size")
    private String sizeName;

    private Boolean isActive;

    @Temporal(TemporalType.DATE)
    private Date createDate = new Date();

    @Temporal(TemporalType.DATE)
    private Date deleteDate;

    @OneToMany(mappedBy = "detailsSizeId", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<DetailsSize> detailsSizes;
}
