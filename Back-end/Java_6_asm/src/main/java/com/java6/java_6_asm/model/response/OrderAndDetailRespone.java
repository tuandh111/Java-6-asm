package com.java6.java_6_asm.model.response;

import com.java6.java_6_asm.entities.Order;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderAndDetailRespone {
    private Order order;
    private List<String> cartId;

    public static List<OrderAndDetailRespone> convert(List<Object[]> list){
        List<OrderAndDetailRespone> finalList = new ArrayList<>();
        for(Object[] o : list){
            OrderAndDetailRespone orderAndDetailRespone = new OrderAndDetailRespone();
            Order or = (Order) o[0];
            String cartIdString = (String) o[1];
            String [] cartIdArr = new String[0];

            if(cartIdString!=null){
                cartIdArr=cartIdString.split(",");
            }

            orderAndDetailRespone.setOrder(or);
            orderAndDetailRespone.setCartId(Arrays.asList(cartIdArr));

            finalList.add(orderAndDetailRespone);
        }
        return finalList;
     }
}
