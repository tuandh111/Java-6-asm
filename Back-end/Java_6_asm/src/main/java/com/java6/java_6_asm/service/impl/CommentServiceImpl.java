package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.Comment;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.model.request.CommentRequest;
import com.java6.java_6_asm.repositories.CommentRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {
    @Autowired
    CommentRepository commentRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;

    @Override
    public List<Comment> findByAllProductId(Integer id) {
        return commentRepository.findAllByProductId(id);
    }

    @Override
    public Comment saveComment(HttpServletRequest httpServletRequest, CommentRequest commentRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(null);
        Comment comment = new Comment();
        comment.setStar(commentRequest.getStar());
        comment.setMessage(commentRequest.getMessage());
        comment.setUserId(user.getId());
        comment.setProductId(commentRequest.getProductId());
        commentRepository.save(comment);
        return comment;
    }

}
