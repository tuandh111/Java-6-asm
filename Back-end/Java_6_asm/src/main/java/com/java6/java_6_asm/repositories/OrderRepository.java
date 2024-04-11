package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Order;
import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {

    @Query("select o,(Select STRING_AGG(c.cartId, ',') from Cart c Where c.order=o) from Order o order by o.createAt desc")
    List<Object[]> getAllOrderDetail();

    @Query("SELECT o FROM Order o WHERE o.user.id = :id AND o.status = :status ORDER BY o.createAt DESC")
    Optional<Order> findByUserId(@Param("id") Integer id, @Param("status") String status);

    @Query("SELECT o FROM Order o WHERE o.user.id = :id ORDER BY o.createAt DESC")
    List<Order> findByListOrder(@Param("id") Integer id);

    @Query("SELECT o FROM Order o WHERE o.contactId = :id ORDER BY o.createAt DESC" )
    List<Order> findByContactId(@Param("id") Integer id);

    @Query("select month(o.createAt), sum(o.totalAmount) From Order o where o.status like '%Thành công%' group by month(o.createAt) ORDER BY month(o.createAt) ASC")
    List<Object[]> dataRevenueByMonth();

    @Query("SELECT p.productId, SUM(o.totalAmount) " +
            "FROM Order o left join  Cart  c ON c.order.orderId=o.orderId " +
            "left join Product p ON p.productId=c.product.productId "+
            "WHERE o.status LIKE '%Thành công%' " +
            "GROUP BY p.productId " +
            "ORDER BY SUM(o.totalAmount) ASC limit 5")
    List<Object[]> dataRevenueByProduct();


    @Query("Select b.nameBrand ,sum(o.totalAmount) From Order o "+
    "JOIN o.carts c "+
    "JOIN c.product p "+
    "JOIN p.brand b "+
    "WHERE o.status like '%Thành công%' "+
    "GROUP BY b.nameBrand")
    List<Object[]> dataRevenueByBrand();
}
