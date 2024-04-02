package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Comment;
import com.java6.java_6_asm.model.request.CommentRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface CommentService {

    List<Comment> findByAllProductId(Integer id);

    Comment saveComment(HttpServletRequest httpServletRequest, CommentRequest commentRequest);

}
