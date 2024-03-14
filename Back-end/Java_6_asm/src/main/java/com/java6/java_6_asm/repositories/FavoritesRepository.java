package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Favorites;
import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorites,Integer> {

}
