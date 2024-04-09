package com.java6.java_6_asm.service.impl.product;

import com.java6.java_6_asm.entities._enum.Gender;
import com.java6.java_6_asm.entities.product.*;
import com.java6.java_6_asm.model.request.ProductRequest;
import com.java6.java_6_asm.model.response.ProductRespone;
import com.java6.java_6_asm.model.request.TopProductRequest;
import com.java6.java_6_asm.repositories.product.*;
import com.java6.java_6_asm.service.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired ProductRepository productRepository;
    @Autowired
    BrandRepository brandRepository;
    @Autowired
    SizeRepository sizeRepository;
    @Autowired
    ColorRepository colorRepository;
    @Autowired
    ProductImageRepository productImageRepository;
    @Autowired
    DetailsColorRepository detailsColorRepository;
    @Autowired
    DetailsSizeRepository detailsSizeRepository;
    @Autowired
    DetailsQuantityRepository detailsQuantityRepository;
    @Autowired DiscountRepository discountRepository;
    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }



    @Override
    public List<TopProductRequest> findTopTen() {
        return TopProductRequest.convert(productRepository.findTopTenProduct());
    }

    @Override
    public List<ProductRespone> findAllProduct() {
        return ProductRespone.convert(productRepository.findAllProduct());
    }

    @Override
    public Optional<Product> findById(Integer productId) {
       return productRepository.findById(productId);
    }

    @Override
    public Product save(ProductRequest productRequest) {
        if(productRepository.existsById(productRequest.getProductId())){
            return null;
        }
        Product product = new Product();
        Brand brand = brandRepository.findById(Integer.valueOf(productRequest.getSelectedBrand())).orElse(null);
        product.setProductName(productRequest.getNameProduct());
        product.setIsActive(productRequest.getIsActive());
        product.setQuantityInStock(productRequest.getQuantityInStock());
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription()==null?"":productRequest.getDescription());
        product.setGender(Gender.MALE);
        product.setBrand(brand);
        productRepository.save(product);
        Integer productId=product.getProductId();
        this.setupImage(productId,productRequest,product);
        this.setupDiscount(productId,productRequest,product);
        this.setupDetailsSize(productId,productRequest,product);
        DetailsSize tempDetailsSize=this.setupDetailsSize(productId,productRequest,product);
        DetailsColor tempDetailColor=this.setupDetailsColor(productId,productRequest,product);
        this.setupDetailsQuantity(productId,productRequest,product,tempDetailsSize,tempDetailColor);
        return product;
    }

    @Override
    public Product update(Integer productId, ProductRequest productRequest) {
        if(!productRepository.existsById(productId)){
            return null;
        }
        Product product = this.findById(productId).get();
        product.setProductName(productRequest.getNameProduct());
        product.setIsActive(productRequest.getIsActive());
        product.setPrice(productRequest.getPrice());
        product.setDescription(productRequest.getDescription()==null?"":productRequest.getDescription());
        Brand brand = brandRepository.findById(Integer.valueOf(productRequest.getSelectedBrand())).orElse(null);
        product.setBrand(brand);
        productRepository.save(product);

        this.setupImage(productId,productRequest,product);
        this.setupDiscount(productId,productRequest,product);
        this.setupDetailsSize(productId,productRequest,product);
        DetailsSize tempDetailsSize=this.setupDetailsSize(productId,productRequest,product);
        DetailsColor tempDetailColor=this.setupDetailsColor(productId,productRequest,product);
        this.setupDetailsQuantity(productId,productRequest,product,tempDetailsSize,tempDetailColor);

        return product;

    }

    @Override
    public Product delete(Integer productId) {
        if(!productRepository.existsById(productId)){
            return null;
        }
        Product product = this.findById(productId).get();
        product.setDeleteDate(new Date());
        product.setIsActive(false);
        productRepository.save(product);
        return product;
    }

    @Override
    public List<Product> findAllCategory(String id) {
        return productRepository.findAllByBrand(id);
    }

    @Override
    public List<Product> findAllAndSort() {
        return productRepository.findAllAndSort();
    }

    @Override
    public Map<String, Object> getDataForAdmin() {
        Map<String,Object> data = new HashMap<>();
        data.put("products",productRepository.findAllAndSort());
        data.put("brands",brandRepository.findAllBrandActive());
        data.put("sizes", sizeRepository.findAllSizeActive());
        data.put("colors",colorRepository.findAllColorActive());
        data.put("productImages",productImageRepository.findAll());
        data.put("detailsQuantitys",detailsQuantityRepository.findAll());
        data.put("detailsColors", detailsColorRepository.findAll());
        data.put("detailsSizes",detailsSizeRepository.findAll());
        data.put("discounts", discountRepository.findAll());
        return  data;
    }

    @Override
    public void setupImage(Integer productId, ProductRequest productRequest,Product product) {
        List<String> newImages = productRequest.getImages();
        if(newImages != null && !newImages.isEmpty()){

            List<ProductImage> productImages = productImageRepository.findImageByProduct(productId);
            if(productImages!=null && !productImages.isEmpty()){
                for(ProductImage productImage:productImages){
                    productImageRepository.delete(productImage);
                }
                for(String newImage:newImages){
                    ProductImage productImage = new ProductImage();
                    productImage.setImageName(newImage);
                    productImage.setProduct(product);
                    productImageRepository.save(productImage);
                }
            }else{
                //productId là new
                for(String newImage:newImages){
                    ProductImage productImage = new ProductImage();
                    productImage.setImageName(newImage);
                    productImage.setProduct(product);
                    productImageRepository.save(productImage);
                }
            }

        }
    }

    @Override
    public void setupDiscount(Integer productId, ProductRequest productRequest, Product product) {
        List<Discount> discounts= discountRepository.findDiscountByProduct(productId);
        if(!discounts.isEmpty()){
            for(Discount discount:discounts){
                discount.setDiscountedPrice(productRequest.getDiscount());
                discountRepository.save(discount);
            }
        }else{
            Discount discount = new Discount();
            discount.setProduct(product);
            discount.setDiscountedPrice(productRequest.getDiscount());
            discountRepository.save(discount);
        }
    }

    @Override
    public DetailsSize setupDetailsSize(Integer productId, ProductRequest productRequest, Product product) {
        List<DetailsSize> detailsSizes=detailsSizeRepository.findDetailSizeByProduct(productId);
        Size size = sizeRepository.findById(Integer.valueOf(productRequest.getSelectedSize())).orElse(null);
        DetailsSize tempDetailsSize=null;
        if (size != null && detailsSizes.stream().noneMatch(detailsSize -> detailsSize.getSize().getSizeId() == size.getSizeId())) {
            // Nếu không tồn tại, tạo mới một DetailsSize và thêm vào detailsSizes
            DetailsSize newDetailsSize = new DetailsSize();
            newDetailsSize.setProduct(product);
            newDetailsSize.setSize(size);
            detailsSizeRepository.save(newDetailsSize);
            tempDetailsSize=newDetailsSize;
        }else{
            for (DetailsSize detailSize : detailsSizes) {
                if (detailSize.getSize().getSizeId() == size.getSizeId()) {
                    tempDetailsSize = detailSize;
                    break; // Đã tìm thấy và gán tempSize, không cần duyệt tiếp
                }
            }
        }
        return tempDetailsSize;// trả về details size để sét bảng chi tiết số lượng
    }

    @Override
    public DetailsColor setupDetailsColor(Integer productId, ProductRequest productRequest, Product product) {
        List<DetailsColor> detailsColors = detailsColorRepository.findDetailsColorByProduct(productId);
        Color color = colorRepository.findById(Integer.valueOf(productRequest.getSelectedColor())).orElse(null);
        DetailsColor tempDetailColor=null;
        if(color!=null && detailsColors.stream().noneMatch(detailColor ->detailColor.getColor().getColorId()==color.getColorId())){
            DetailsColor newDetailsColor = new DetailsColor();
            newDetailsColor.setProduct(product);
            newDetailsColor.setColor(color);
            detailsColorRepository.save(newDetailsColor);
            tempDetailColor=newDetailsColor;
        }else{
            for (DetailsColor detailsColor : detailsColors) {
                if (detailsColor.getColor().getColorId() == color.getColorId()) {
                    tempDetailColor = detailsColor;
                    break; // Đã tìm thấy và gán tempSize, không cần duyệt tiếp
                }
            }
        }
        return  tempDetailColor;
    }

    @Override
    public void setupDetailsQuantity(Integer productId, ProductRequest productRequest, Product product, DetailsSize tempDetailsSize, DetailsColor tempDetailColor) {
        List<DetailsQuantity> detailsQuantities=detailsQuantityRepository.findDetailsQuantityProduct(productId);
        boolean found = false;
        for(DetailsQuantity dq:detailsQuantities){
            if(dq.getDetailsColorId()==tempDetailColor.getDetailsColorId() && dq.getDetailsSizeId()==tempDetailsSize.getDetailsSizeId()){
                dq.setQuantity(productRequest.getQuantityInStock());
                detailsQuantityRepository.save(dq);
                found=true;
                break;
            }
        }

        if(!found){
            DetailsQuantity newDetailsQuantity = new DetailsQuantity();
            newDetailsQuantity.setProductId(product);
            newDetailsQuantity.setDetailsColorId(tempDetailColor.getDetailsColorId());
            newDetailsQuantity.setDetailsSizeId(tempDetailsSize.getDetailsSizeId());
            newDetailsQuantity.setQuantity(productRequest.getQuantityInStock());
            newDetailsQuantity.setSpecialPrice(productRequest.getPrice());
            detailsQuantityRepository.save(newDetailsQuantity);
        }
    }

}
