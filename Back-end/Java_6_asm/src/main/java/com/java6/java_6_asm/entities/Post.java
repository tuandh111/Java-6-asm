package com.java6.java_6_asm.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int postId;

    private String title;

    private String content;

    private String image;

    @Temporal(TemporalType.DATE)
    private Date createDate;

    private Integer views ;

    private Integer userId;
}
