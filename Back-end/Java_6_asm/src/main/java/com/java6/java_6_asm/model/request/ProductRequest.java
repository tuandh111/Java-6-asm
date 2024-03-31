package com.java6.java_6_asm.model.request;

import com.java6.java_6_asm.entities._enum.Gender;
import com.java6.java_6_asm.entities.product.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductRequest {
    private Product product;
    private String brandName;
    private double discountedPrice;
    private List<String> imageNames =new ArrayList<>();
    private List<String> sizeName=new ArrayList<>();
    private List<String> colorName=new ArrayList<>();

    public static List<ProductRequest> convert(List<Object[]> list){
        List<ProductRequest> finalList = new ArrayList<>();
        for (Object[] o : list) {
            ProductRequest productRequest = new ProductRequest();
            Product p = (Product) o[0];
            String brandName = (String) o[1];
            double discountedPrice = o[2]==null?0:(double) o[2];

            String imageName = (String) o[3];
            String[] imageNameArray = imageName.split(",");

            String sizeName = (String) o[4];
            String[] sizeNameArray=sizeName.split(",");

            String colorName = (String) o[5];
            String[] colorNameArray=colorName.split(",");


            productRequest.setProduct(p);
            productRequest.setBrandName(brandName);
            productRequest.setDiscountedPrice(discountedPrice);
            productRequest.setImageNames(Arrays.asList(imageNameArray));
            productRequest.setSizeName(Arrays.asList(sizeNameArray));
            productRequest.setColorName(Arrays.asList(colorNameArray));
            finalList.add(productRequest);
        }
        return finalList;
    }
}
