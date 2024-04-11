package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.config.ConfigVNPay;
import com.java6.java_6_asm.controller.PaymentController;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.DetailsColor;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.entities.product.ProductImage;
import com.java6.java_6_asm.exception.BadRequestException;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.*;
import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.repositories.product.DetailsColorRepository;
import com.java6.java_6_asm.repositories.product.ProductImageRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.CartService;
import com.java6.java_6_asm.service.service.OrderService;
import com.java6.java_6_asm.service.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    CartRepository cartRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserService userService;
    @Autowired
    ProductImageRepository productImageRepository;
    @Autowired
    DetailsColorRepository detailsColorRepository;
    @Autowired
    OrderRepository orderRepository;


    @Override
    public List<Cart> findAllCartId(CartIdRequest cartIdRequest) {
        List<Cart> newListCartId = new ArrayList<>();
        String[] cartIds = cartIdRequest.getCartId();
        System.out.println("dd: " + cartIds);
        for (String cartId : cartIds) {
            Optional<Cart> cartOptional = cartRepository.findById(cartId);
            if (cartOptional.isPresent()) {
                newListCartId.add(cartOptional.get());
            }
        }
        for (Cart cart : newListCartId) {
            System.out.println("car: " + cart.getCartId());
        }
        return newListCartId;
    }

    @Override
    public List<Cart> updateCheckOut(HttpServletRequest httpServletRequest, CheckOutCartIdRequest checkOutCartIdRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found userId with Id: "));
        List<Cart> newListCartId = new ArrayList<>();
        String[] cartIds = checkOutCartIdRequest.getCartId();
        for (String cartId : cartIds) {
            Optional<Cart> cartOptional = cartRepository.findById(cartId);
            if (cartOptional.isPresent()) {
                newListCartId.add(cartOptional.get());
            }
        }
        
        if (checkOutCartIdRequest.getPayments().equalsIgnoreCase("COD")) {
            Order orderNew = new Order();
            orderNew.setOrderId(ConfigVNPay.getRandomString(12));
            orderNew.setContactId(checkOutCartIdRequest.getContactId());
            orderNew.setTotalAmount(checkOutCartIdRequest.getTotalCartAll());
            orderNew.setUser(user);
            orderNew.setIdVoucher(checkOutCartIdRequest.getUserId());
            orderNew.setPayments(checkOutCartIdRequest.getPayments());
            orderNew.setStatus("Đang chờ xác nhận");
            orderNew.setNote("");
            orderRepository.save(orderNew);
            for (Cart cart : newListCartId) {
                cart.setVoucherId(checkOutCartIdRequest.getUserId());
                cart.setCheckPay(true);
                cart.setOrder(orderNew);
                cartRepository.save(cart);
            }
        }
        return newListCartId;
    }

    @Override
    public List<Cart> findAllByUser(HttpServletRequest httpServletRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userService.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found user with email: " + email));
        return cartRepository.findAllByUser(user);
    }

    @Override
    public void deleteByUserAndProduct(DeleteCartUserAnhProductRequest deleteCartUserAnhProductRequest) {
        cartRepository.deleteByUserAndProduct(deleteCartUserAnhProductRequest.getUserId(), deleteCartUserAnhProductRequest.getProductId());
    }

    @Override
    public Cart findByProductIDAndAndUserID(Integer userID, Integer productID) {
        return cartRepository.findByProductIDAndAndUserID(userID, productID, userID, productID);
    }

    @Override
    public Cart saveCart(HttpServletRequest httpServletRequest, CartRequest cartRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        Product product = productRepository.findById(cartRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartRequest.getProductId()));
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartRequest.getUserId()));
//        Optional<Order> order = orderRepository.findByUserId(user.getId(), "Đặt hàng");
//        if (order.isEmpty()) {
//            Order orderNew = new Order();
//            orderNew.setOrderId(ConfigVNPay.getRandomString(12));
//            orderNew.setStatus("Đặt hàng");
//            orderNew.setUser(user);
//            orderRepository.save(orderNew);
//        }
        DetailsColor detailsColor = detailsColorRepository.findById(cartRequest.getColorId()).orElseThrow(null);
        System.out.println("checkcart: " + user.getId() + " " + product.getProductId() + " " + cartRequest.getColorId() + " " + cartRequest.getSizeId() + " - " + detailsColor.getDetailsColorId());
        Cart checkCart = cartRepository.findByProductIDAndAndUserID(user.getId(), product.getProductId(), cartRequest.getColorId(), cartRequest.getSizeId());
        System.out.println("chc: " + checkCart);
        if (checkCart == null) {
            Cart cart = new Cart();
            cart.setCartId(ConfigVNPay.getRandomString(12));
            cart.setUser(user);
            cart.setProduct(product);
            cart.setQuantity(cartRequest.getQuantity());
            cart.setColorId(detailsColor.getDetailsColorId());
            cart.setImageId(detailsColor.getImageId());
            cart.setSizeId(cartRequest.getSizeId());
            cart.setCheckPay(false);
            cartRepository.save(cart);
            product.setQuantityInStock(product.getQuantityInStock() - cartRequest.getQuantity());
            productRepository.save(product);
            return cart;
        } else {
            checkCart.setUser(user);
            checkCart.setProduct(product);
            checkCart.setQuantity(checkCart.getQuantity() + cartRequest.getQuantity());
            checkCart.setColorId(detailsColor.getDetailsColorId());
            checkCart.setImageId(detailsColor.getImageId());
            checkCart.setSizeId(cartRequest.getSizeId());
            checkCart.setCheckPay(false);
            cartRepository.save(checkCart);
            product.setQuantityInStock(product.getQuantityInStock() - cartRequest.getQuantity());
            productRepository.save(product);
            return checkCart;
        }

    }

    @Override
    public Cart updateCart(String cartId, CartRequest cartRequest, HttpServletRequest httpServletRequest) {
        System.out.println("CartId: " + cartRepository.findById(cartId));
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Not Found cartId With Id:" + cartId));
        Product product = productRepository.findById(cartRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartRequest.getProductId()));
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartRequest.getUserId()));

//        Optional<Order> order = orderRepository.findByUserId(user.getId(), "Đặt hàng");
//        System.out.println("số " + order);
//        if (order.isEmpty()) {
//
//            Order orderNew = new Order();
//            orderNew.setOrderId(ConfigVNPay.getRandomString(12));
//            orderNew.setStatus("Đặt hàng");
//            orderNew.setUser(user);
//            orderRepository.save(orderNew);
//        }
        if (cartRequest.getQuantity() > cart.getQuantity()) {
            product.setQuantityInStock(product.getQuantityInStock() - (cartRequest.getQuantity() - cart.getQuantity()));
            productRepository.save(product);
        } else if (cartRequest.getQuantity() < cart.getQuantity()) {
            product.setQuantityInStock(product.getQuantityInStock() + (cart.getQuantity() - cartRequest.getQuantity()));
            productRepository.save(product);
        }
        cart.setCartId(cartId);
        cart.setUser(user);
        cart.setProduct(product);
        cart.setQuantity(cartRequest.getQuantity());
        cart.setCheckPay(false);
        cartRepository.save(cart);
        return cart;
    }

    @Override
    public Cart updateCartColor(String cartId, CartColorRequest cartColorRequest, HttpServletRequest httpServletRequest) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Not Found cartId With Id:" + cartId));
        Product product = productRepository.findById(cartColorRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartColorRequest.getProductId()));
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartColorRequest.getUserId()));
        DetailsColor detailsColor = detailsColorRepository.findById(cartColorRequest.getColorId()).orElseThrow(null);
        Cart checkCart = cartRepository.findByProductIDAndAndUserID(user.getId(), product.getProductId(), cartColorRequest.getColorId(), cart.getSizeId());
        System.out.println("checkCartColor: " + checkCart);
        if (checkCart == null) {
            cart.setCartId(cartId);
            cart.setColorId(cartColorRequest.getColorId());
            cart.setUser(user);
            cart.setImageId(detailsColor.getImageId());
            cart.setProduct(product);
            cart.setCheckPay(false);
            cartRepository.save(cart);
            return cart;
        }
        return null;

    }

    @Override
    public Cart updateCartSize(String cartId, CartSizeRequest cartSizeRequest, HttpServletRequest httpServletRequest) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new NotFoundException("Not Found cartId With Id:" + cartId));
        Product product = productRepository.findById(cartSizeRequest.getProductId()).orElseThrow(() -> new NotFoundException("Not found product with Id: " + cartSizeRequest.getProductId()));
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(() -> new NotFoundException("Not found userId with Id: " + cartSizeRequest.getUserId()));
        Cart checkCart = cartRepository.findByProductIDAndAndUserID(user.getId(), product.getProductId(), cart.getColorId(), cartSizeRequest.getSizeId());
        System.out.println("checkCartSize: " + checkCart);
        if (checkCart == null) {
            cart.setCartId(cartId);
            cart.setSizeId(cartSizeRequest.getSizeId());
            cart.setUser(user);
            cart.setProduct(product);
            cart.setCheckPay(false);
            cartRepository.save(cart);
            return cart;
        }
        return null;
    }

    @Override
    public void DeleteCart(String cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow();
        Product product = productRepository.findById(cart.getProduct().getProductId()).orElseThrow();
        product.setQuantityInStock(product.getQuantityInStock() + cart.getQuantity());
        productRepository.save(product);
        cartRepository.deleteById(cartId);
    }

    @Override
    public List<Cart> findAllCartForAdmin() {
        return cartRepository.findAll();
    }

    @Override
    public List<Cart> finAllOrderId(String orderId) {
        return cartRepository.findByAllOrderId(orderId);
    }
}
