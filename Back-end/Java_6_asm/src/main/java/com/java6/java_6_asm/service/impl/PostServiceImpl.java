package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.Post;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.PostRequest;
import com.java6.java_6_asm.repositories.PostRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
@Service
public class PostServiceImpl implements PostService {
    @Autowired
    PostRepository postRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;
    @Override
    public List<Post> findAllPost() {
        return postRepository.findAll();
    }

    @Override
    public Post savePost(HttpServletRequest httpServletRequest, PostRequest postRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Not found user with email: "+email));
        Post post = new Post();
        post.setContent(postRequest.getContent());
        post.setImage(postRequest.getImage());
        post.setTitle(postRequest.getTitle());
        post.setViews(0);
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            post.setCreateDate(dateFormat.parse(postRequest.getCreateDate()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        post.setUserId(user.getId());
        postRepository.save(post);
        return post;
    }

    @Override
    public Post updatePost(Integer postId,HttpServletRequest httpServletRequest, PostRequest postRequest) {
        Post post = postRepository.findById(postId).orElseThrow(()-> new NotFoundException("Not found post with id: "+ postId));
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("Not found user with email: "+email));
        post.setContent(postRequest.getContent());
        post.setImage(postRequest.getImage());
        post.setTitle(postRequest.getTitle());
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        try {
            post.setCreateDate(dateFormat.parse(postRequest.getCreateDate()));
        } catch (ParseException e) {
            throw new RuntimeException(e);
        }
        post.setUserId(user.getId());
        postRepository.save(post);
        return post;
    }

    @Override
    public void deletePost(Integer postId) {
        Post post = postRepository.findById(postId).orElseThrow(()-> new NotFoundException("Not found post with id: "+ postId));
        postRepository.delete(post);
    }

    @Override
    public Post updatePostView(Integer postId) {
        Post post = postRepository.findById(postId).orElseThrow(()-> new NotFoundException("Not found post with id: "+ postId));
        post.setViews(post.getViews()+1);
        postRepository.save(post);
        return post;
    }
}
