package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Comment;
import com.java6.java_6_asm.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
    @Query("select  c from  Comment  c where  c.ProductId = :id ")
    List<Comment> findAllByProductId(@Param("id") Integer id);
}
