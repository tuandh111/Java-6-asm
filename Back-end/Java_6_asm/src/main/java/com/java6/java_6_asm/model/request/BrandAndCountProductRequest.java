package com.java6.java_6_asm.model.request;

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
public class BrandAndCountProductRequest {
    private Brand brand;
    private  List<Integer> productId;

    public static List<BrandAndCountProductRequest> convert(List<Object[]> list){
        List<BrandAndCountProductRequest> finalList = new ArrayList<>();
        for (Object[] o : list) {
            BrandAndCountProductRequest brandAndCountProductRequest = new BrandAndCountProductRequest();
            Brand b = (Brand) o[0];
            String productIdString = (String) o[1];
            String[] productIdStringArr = productIdString.split(",");
            Integer[] productIdIntegerArr = new Integer[productIdStringArr.length];

            for (int i = 0; i < productIdStringArr.length; i++) {
                productIdIntegerArr[i] = Integer.parseInt(productIdStringArr[i]);
            }

            brandAndCountProductRequest.setBrand(b);
            brandAndCountProductRequest.setProductId(Arrays.asList(productIdIntegerArr));

            finalList.add(brandAndCountProductRequest);
        }
        return finalList;
    }
}
