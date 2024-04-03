package com.java6.java_6_asm.model.response;

import com.java6.java_6_asm.entities.product.Brand;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BrandAndCountProductRespone {
    private Brand brand;
    private  List<Integer> productId;

    public static List<BrandAndCountProductRespone> convert(List<Object[]> list){
        List<BrandAndCountProductRespone> finalList = new ArrayList<>();
        for (Object[] o : list) {
            BrandAndCountProductRespone brandAndCountProductRespone = new BrandAndCountProductRespone();
            Brand b = (Brand) o[0];
            String productIdString = (String) o[1];
            Integer[] productIdIntegerArr = new Integer[0];

            if(productIdString!=null){
                String[] productIdStringArr = productIdString.split(",");
                productIdIntegerArr = new Integer[productIdStringArr.length];
                for (int i = 0; i < productIdStringArr.length; i++) {
                    productIdIntegerArr[i] = Integer.parseInt(productIdStringArr[i]);
                }
            }



            brandAndCountProductRespone.setBrand(b);
            brandAndCountProductRespone.setProductId(Arrays.asList(productIdIntegerArr));

            finalList.add(brandAndCountProductRespone);
        }
        return finalList;
    }
}
