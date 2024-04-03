package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Post;
import com.java6.java_6_asm.entities.product.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Integer> {
}
