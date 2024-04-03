package com.java6.java_6_asm.model.response;

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
public class ProductRespone {
    private Product product;
    private String brandName;
    private double discountedPrice;
    private List<String> imageNames =new ArrayList<>();
    private List<String> sizeName=new ArrayList<>();
    private List<String> colorName=new ArrayList<>();

    public static List<ProductRespone> convert(List<Object[]> list){
        List<ProductRespone> finalList = new ArrayList<>();
        for (Object[] o : list) {
            ProductRespone productRespone = new ProductRespone();
            Product p = (Product) o[0];
            String brandName = (String) o[1];
            double discountedPrice = o[2]==null?0:(double) o[2];

            String imageName = (String) o[3];
            String[] imageNameArray = imageName.split(",");

            String sizeName = (String) o[4];
            String[] sizeNameArray=sizeName.split(",");

            String colorName = (String) o[5];
            String[] colorNameArray=colorName.split(",");


            productRespone.setProduct(p);
            productRespone.setBrandName(brandName);
            productRespone.setDiscountedPrice(discountedPrice);
            productRespone.setImageNames(Arrays.asList(imageNameArray));
            productRespone.setSizeName(Arrays.asList(sizeNameArray));
            productRespone.setColorName(Arrays.asList(colorNameArray));
            finalList.add(productRespone);
        }
        return finalList;
    }
}
