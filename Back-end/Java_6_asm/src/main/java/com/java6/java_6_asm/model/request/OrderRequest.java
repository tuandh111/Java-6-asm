package com.java6.java_6_asm.model.request;

import com.java6.java_6_asm.entities.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {
    private String orderId;
    private Date createAt = new Date();
    private double totalAmount;
    private String note;
    private String status;
//    private User user;
}
