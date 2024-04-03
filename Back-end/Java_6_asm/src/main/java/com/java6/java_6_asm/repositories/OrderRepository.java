package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order,String> {
    @Query("Select o,u,(SELECT STRING_AGG(p.productId, ',') FROM Product p Where p.brand=b) "+
    "from Order o "+
//    "Join o.cart c "+
//    "Join c.product p "+
    "join o.user u "+
    "order by o.createAt desc ")
    List<Object[]> getAllOrderDetail();
}
