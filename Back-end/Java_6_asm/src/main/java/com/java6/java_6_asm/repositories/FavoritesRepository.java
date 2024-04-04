package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Favorites;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites,Integer> {
    @Query("select  f from Favorites f where f.user.id = :id ")
    List<Favorites> findByUserId(Integer id);

    @Query("SELECT w FROM Favorites  w WHERE w.user.id = :userID AND w.productId.productId = :productID")
    List<Favorites> findByUserIDAndProductID(@Param("userID") Integer userID, @Param("productID") Integer productID);

    //    //Xoa like
    @Transactional
    @Modifying
    @Query("DELETE FROM Favorites w WHERE w.user.id = :user AND w.productId.productId = :product")
    void deleteByUserAndProduct(@Param("user") Integer userID, @Param("product") Integer productID);

}
