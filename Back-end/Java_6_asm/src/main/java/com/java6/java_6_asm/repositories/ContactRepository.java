package com.java6.java_6_asm.repositories;

import com.java6.java_6_asm.entities.Contact;
import com.java6.java_6_asm.entities.product.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContactRepository extends JpaRepository<Contact, Integer> {
    @Query("select  c  from Contact c where c.user.id = :userId")
    List<Contact> findAllByUserId(@Param("userId") int userId);

    @Query("select  c  from Contact c where c.contactId = :userId")
    Contact findByContactId(@Param("userId") int userId);
}
