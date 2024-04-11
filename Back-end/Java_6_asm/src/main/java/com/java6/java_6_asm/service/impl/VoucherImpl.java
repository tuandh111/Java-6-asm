package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.controller.PaymentController;
import com.java6.java_6_asm.entities.Voucher;
import com.java6.java_6_asm.model.request.VoucherRequest;
import com.java6.java_6_asm.repositories.VoucherRepository;
import com.java6.java_6_asm.service.service.VoucherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoucherImpl implements VoucherService {
    @Autowired
    VoucherRepository voucherRepository;

    @Override
    public List<Voucher> findAllVoucher() {
        return voucherRepository.findAll();
    }

    @Override
    public Voucher saveVoucher(VoucherRequest voucherRequest) {
        return null;
    }

    @Override
    public Voucher findByVoucherName(String voucherName) {
        return voucherRepository.findByVoucherName(voucherName);
    }

    @Override
    public Voucher findByVoucherId(int voucherId) {
        return voucherRepository.findByVoucherId(voucherId);
    }
}
