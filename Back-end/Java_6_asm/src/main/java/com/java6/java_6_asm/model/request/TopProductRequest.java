package com.java6.java_6_asm.model.request;

import com.java6.java_6_asm.entities.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TopProductRequest {
    private Product product;
    private List<String> imageNames =new ArrayList<>();

    public static List<TopProductRequest> convert(List<Object[]> list){
        List<TopProductRequest> finalList = new ArrayList<>();
        for (Object[] o : list) {
            TopProductRequest topProductRequest = new TopProductRequest();
            Product p = (Product) o[0];
            String imageName = (String) o[1];
            String[] imageNameArray = imageName.split(",");
            topProductRequest.setProduct(p);
            topProductRequest.setImageNames(Arrays.asList(imageNameArray));
            finalList.add(topProductRequest);
        }
        return finalList;
    }
}
