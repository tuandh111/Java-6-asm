package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Voucher;
import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherRepository extends JpaRepository<Voucher, Integer> {
    @Query("select v from Voucher  v where  v.voucherName = :voucherName")
    Voucher findByVoucherName(@Param("voucherName") String voucherName);

    @Query("select v from Voucher  v where  v.voucherId = :voucherId")
    Voucher findByVoucherId(@Param("voucherId") int voucherId);

}
