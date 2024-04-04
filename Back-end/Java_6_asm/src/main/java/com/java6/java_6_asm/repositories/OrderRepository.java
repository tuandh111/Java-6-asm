package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,String> {

    @Query("select o,(Select STRING_AGG(c.cartId, ',') from Cart c Where c.order=o) from Order o")
    List<Object[]> getAllOrderDetail();
}
