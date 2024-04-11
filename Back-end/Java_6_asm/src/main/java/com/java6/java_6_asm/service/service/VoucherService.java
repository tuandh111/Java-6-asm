package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Voucher;
import com.java6.java_6_asm.model.request.VoucherRequest;

import java.util.List;

public interface VoucherService {
    List<Voucher> findAllVoucher();

    Voucher saveVoucher(VoucherRequest voucherRequest);

    Voucher findByVoucherName(String voucherName);

    Voucher findByVoucherId(int voucherId);

}
