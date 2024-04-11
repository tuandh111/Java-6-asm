package com.java6.java_6_asm.controller;


import com.java6.java_6_asm.config.ConfigVNPay;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.PaymentRequest;
import com.java6.java_6_asm.model.response.MessageResponse;
import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.repositories.OrderRepository;
import com.java6.java_6_asm.repositories.PaymentRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.utils.CookieService;
import com.java6.java_6_asm.service.service.utils.ParamService;
import com.java6.java_6_asm.service.service.utils.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.hibernate.annotations.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
public class PaymentController {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    CartRepository cartRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    OrderRepository orderRepository;
    @Autowired
    HttpSession session;
    @Autowired
    CookieService cookieService;
    public static String check = "check";
    public static PaymentRequest paymentRequest1 = null;

    @PostMapping("/pay")
    public ResponseEntity<?> getPay(HttpServletRequest httpServletRequest, @RequestBody PaymentRequest paymentRequest) throws UnsupportedEncodingException {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User userCustom = userRepository.findByEmail(email).orElseThrow(null);
        List<Cart> cartList = cartRepository.findAllByUser(userCustom);
        for (Cart cart : cartList) {
            Product product = productRepository.findById(cart.getProduct().getProductId()).orElseThrow(null);
            if (product.getQuantityInStock() == 0) {
                return ResponseEntity.ok("failQuantity");
            }
            if (product.getQuantityInStock() - cart.getQuantity() < 0) {
                return ResponseEntity.ok("NotEnoughProducts");
            }
        }
        List<Cart> newListCartId = new ArrayList<>();
        paymentRequest1 = paymentRequest;
        String[] cartIds = paymentRequest.getCartId();
        for (String cartId : cartIds) {
            Optional<Cart> cartOptional = cartRepository.findById(cartId);
            if (cartOptional.isPresent()) {
                newListCartId.add(cartOptional.get());
            }
        }
        String idOrder = ConfigVNPay.getRandomString(12);
        Optional<Order> order = orderRepository.findById(check);
        if (paymentRequest.getPayments() != null && order.isEmpty()) {
            check = idOrder;
            Order orderNew = new Order();
            orderNew.setOrderId(idOrder);
            orderNew.setContactId(paymentRequest.getContactId());
            orderNew.setTotalAmount(paymentRequest.getTotalAmount());
            orderNew.setUser(userCustom);
            orderNew.setIdVoucher(paymentRequest.getUserId());
            orderNew.setPayments(paymentRequest.getPayments());
            orderNew.setStatus("Đang chờ xác nhận");
            orderNew.setNote("");
            //orderRepository.save(orderNew);
            for (Cart cart : newListCartId) {
                cart.setVoucherId(paymentRequest.getUserId());
                cart.setCheckPay(true);
                cart.setOrder(orderNew);
                // cartRepository.save(cart);
            }
        }
        long totalPrice = (long) paymentRequest.getTotalAmount();
        System.out.println("tp" + totalPrice);
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = totalPrice * 100;
        String bankCode = "NCB";

        String vnp_TxnRef = ConfigVNPay.getRandomNumber(8);
        String vnp_IpAddr = "127.0.0.1";

        String vnp_TmnCode = ConfigVNPay.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        vnp_Params.put("vnp_BankCode", bankCode);
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang:" + vnp_TxnRef);
        vnp_Params.put("vnp_OrderType", orderType);

        vnp_Params.put("vnp_Locale", "vn");
        vnp_Params.put("vnp_ReturnUrl", ConfigVNPay.vnp_ReturnUrl + "?PhoneID=" + paymentRequest.getTotalAmount());
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 15);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = ConfigVNPay.hmacSHA512(ConfigVNPay.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = ConfigVNPay.vnp_PayUrl + "?" + queryUrl;
        System.out.println("url: " + paymentUrl);
        return ResponseEntity.ok(new MessageResponse(paymentUrl));
    }

    @GetMapping("/auth/payment")
    public void paymentController(Model model, HttpServletResponse httpServletResponse, HttpServletRequest httpServletRequest, @RequestParam("PhoneID") String PhoneID, @RequestParam("vnp_Amount") String vnp_Amount, @RequestParam("vnp_BankCode") String vnp_BankCode, @RequestParam("vnp_BankTranNo") String vnp_BankTranNo, @RequestParam("vnp_CardType") String vnp_CardType, @RequestParam("vnp_OrderInfo") String vnp_OrderInfo, @RequestParam("vnp_PayDate") String vnp_PayDate, @RequestParam("vnp_ResponseCode") String vnp_ResponseCode, @RequestParam("vnp_TmnCode") String vnp_TmnCode, @RequestParam("vnp_TransactionNo") String vnp_TransactionNo, @RequestParam("vnp_TransactionStatus") String vnp_TransactionStatus, @RequestParam("vnp_TxnRef") String vnp_TxnRef, @RequestParam("vnp_SecureHash") String vnp_SecureHash) {
        check = "check";
        System.out.println("Chạy thành công");
        System.out.println("vnp_Amount: " + Double.parseDouble(vnp_Amount) / 100);
        System.out.println("vnp_BankCode: " + vnp_BankCode);
        System.out.println("vnp_BankTranNo: " + vnp_BankTranNo);
        System.out.println("vnp_CardType: " + vnp_CardType);
        System.out.println("vnp_OrderInfo: " + vnp_OrderInfo);
        System.out.println("vnp_PayDate: " + vnp_PayDate);
        System.out.println("vnp_ResponseCode: " + vnp_ResponseCode);
        System.out.println("vnp_TmnCode: " + vnp_TmnCode);
        System.out.println("vnp_TransactionNo: " + vnp_TransactionNo);
        System.out.println("vnp_TransactionStatus: " + vnp_TransactionStatus);
        System.out.println("vnp_TxnRef: " + vnp_TxnRef);
        System.out.println("vnp_SecureHash: " + vnp_SecureHash);

        List<Cart> newListCartId = new ArrayList<>();
        User userCustom = userRepository.findByEmail("hoangtuan97531@gmail.com").orElseThrow(null);
        String[] cartIds = paymentRequest1.getCartId();
        for (String cartId : cartIds) {
            Optional<Cart> cartOptional = cartRepository.findById(cartId);
            if (cartOptional.isPresent()) {
                newListCartId.add(cartOptional.get());
            }
        }
        String idOrder = ConfigVNPay.getRandomString(12);

        Order orderNew = new Order();
        orderNew.setOrderId(idOrder);
        orderNew.setContactId(paymentRequest1.getContactId());
        orderNew.setTotalAmount(paymentRequest1.getTotalAmount());
        orderNew.setUser(userCustom);
        orderNew.setIdVoucher(paymentRequest1.getUserId());
        orderNew.setPayments(paymentRequest1.getPayments());
        orderNew.setStatus("Đang chờ xác nhận");
        orderNew.setNote("");
        orderRepository.save(orderNew);
        for (Cart cart : newListCartId) {
            cart.setVoucherId(paymentRequest1.getUserId());
            cart.setCheckPay(true);
            cart.setOrder(orderNew);
            cartRepository.save(cart);
        }
        

        try {
            httpServletResponse.sendRedirect("http://127.0.0.1:5501/index.html#!/shop/confirmation");
        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException(e);
        }
    }

}
