package com.java6.java_6_asm.controller;


import com.java6.java_6_asm.config.ConfigVNPay;
import com.java6.java_6_asm.entities.Cart;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.model.request.PaymentRequest;
import com.java6.java_6_asm.model.response.MessageResponse;
import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.repositories.PaymentRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.utils.ParamService;
import com.java6.java_6_asm.service.service.utils.SessionService;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.annotations.Array;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

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

        long totalPrice = (long) paymentRequest.getTotalAmount();
        System.out.println("tp" + totalPrice);
        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = totalPrice *100;
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
        vnp_Params.put("vnp_ReturnUrl", ConfigVNPay.vnp_ReturnUrl + "?PhoneID=" + paymentRequest.getNumberPhone());
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
    public String paymentController(Model model, HttpServletRequest httpServletRequest, @RequestParam("PhoneID") String PhoneID, @RequestParam("vnp_Amount") String vnp_Amount, @RequestParam("vnp_BankCode") String vnp_BankCode, @RequestParam("vnp_BankTranNo") String vnp_BankTranNo, @RequestParam("vnp_CardType") String vnp_CardType, @RequestParam("vnp_OrderInfo") String vnp_OrderInfo, @RequestParam("vnp_PayDate") String vnp_PayDate, @RequestParam("vnp_ResponseCode") String vnp_ResponseCode, @RequestParam("vnp_TmnCode") String vnp_TmnCode, @RequestParam("vnp_TransactionNo") String vnp_TransactionNo, @RequestParam("vnp_TransactionStatus") String vnp_TransactionStatus, @RequestParam("vnp_TxnRef") String vnp_TxnRef, @RequestParam("vnp_SecureHash") String vnp_SecureHash) {
        System.out.println("Chạy thành công");
        // Thực hiện xử lý các tham số truy vấn ở đây
        http:
        //localhost:8080/cart?vnp_Amount=250000000
        // &vnp_BankCode=NCB&
        // vnp_BankTranNo=VNP14299889&
        //vnp_CardType=ATM&
        // vnp_OrderInfo=Thanh+toan+don+hang%3A78587458&
        // vnp_PayDate=20240215113140&
        // vnp_ResponseCode=00&
        // vnp_TmnCode=FYDRTG41&
        // vnp_TransactionNo=14299889&
        // vnp_TransactionStatus=00&
        // vnp_TxnRef=78587458&vnp_SecureHash=3ec5c00659bbffa941d0aa530c2a78eaae315d6df0f3f8469e883c5aafeb00c7e74f7915141f9e009662c2a9e0ffe60ae84b539e66424459c0393ea069e71c1a
        System.out.println("vnp_Amount: " + Double.parseDouble(vnp_Amount)/100);
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
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User userCustom = userRepository.findByEmail(email).orElseThrow(null);
//        Optional<Address> address = addressRepository.findById(PhoneID);
//        if(address.isPresent()) {
//            double totalPrice = sessionService.totalPriceCartByUserId(userCustom);
//            System.out.println("totalPrice: " + totalPrice);
//            String invoiceID = Config.getRandomString(8);
//            //hoa don
//            Invoice invoice = new Invoice();
//            invoice.setCreateAt(new Date());
//            invoice.setInvoiceID(invoiceID);
//            invoice.setNote(address.get().getAddress());
//            invoice.setTotalAmount(totalPrice);
//            invoice.setStatus("Đặt hàng");
//            invoice.setIsDelete(false);
//            invoice.setUser(userCustom);
//            invoiceRepository.save(invoice);
//            Invoice invoice1 = invoiceRepository.findByInvoiceID(invoiceID);
//            List<Cart> cartItems = cartRepository.findAllByUser(userCustom);
//            //hoa don chi tiet
//            for (Cart cart : cartItems) {
//                InvoiceDetail invoiceDetail = new InvoiceDetail();
//                Cart cart1 = cart;
//                invoiceDetail.setCreateAt(new Date());
//                invoiceDetail.setInvoiceID(invoice1);
//                invoiceDetail.setPrice(Double.parseDouble(String.valueOf(getPriceProduct(cart.getProduct().getProductID()))));
//                invoiceDetail.setQuantity(cart.getQuantity());
//                invoiceDetail.setIsDelete(false);
//                invoiceDetail.setProductID(cart.getProduct());
//                invoiceDetailRepository.save(invoiceDetail);
//                cart1.setCheckPay(true);
//                cartRepository.save(cart1);
//                //Vnpay
//                CardVNPay cardVNPay = new CardVNPay();
//                cardVNPay.setId(invoiceID);
//                cardVNPay.setAmount(Double.parseDouble(String.valueOf(getPriceProduct(cart.getProduct().getProductID()))));
//                cardVNPay.setProductCard(cart.getCartId());
//                cardVNPay.setUser(userCustom);
//                cardVNPay.setCreateAt(new Date());
//                cardVNPay.setBackCode(vnp_BankCode);
//                cardVNPay.setInvoiceID(invoice1);
//                cardVNPay.setIsDelete(false);
//                cardVNPayRepository.save(cardVNPay);
//            }
//            Optional<CardVNPay> cardVNPays= cardVNPayRepository.findById(invoiceID);
//            if(cardVNPays.isPresent()){
//                model.addAttribute("payment","Thanh toán thành công");
//            }else {
//                model.addAttribute("payment","");
//            }
//        }

        return "cart";
    }
//    public double getPriceProduct(Integer productID) {
//        FlashSale isFlashSale = flashSaleRepository.findByIsStatus(false);
//
//        double price = 0.0;
//
//        if (isFlashSale != null) {
//            List<PromotionalDetails> pmt = promotionalDetailsRepository.findByFlashSale_Id(isFlashSale.getId());
//
//            Boolean isSale = false;
//            for (PromotionalDetails p : pmt) {
//                if (productID == p.getProductID().getProductID()) {
//                    isSale = true;
//                    price = p.getDiscountedPrice();
//                    return price;
//                }
//            }
//            if (!isSale) {
//                price = productRepository.getById(productID).getPrice();
//            }
//        } else {
//            price = productRepository.getById(productID).getPrice();
//        }
//
//        return price;
//    }
}
