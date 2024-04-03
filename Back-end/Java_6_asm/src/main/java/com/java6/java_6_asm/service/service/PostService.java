package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Post;
import com.java6.java_6_asm.model.request.PostRequest;
import jakarta.servlet.http.HttpServletRequest;

import java.util.List;

public interface PostService {
    List<Post> findAllPost();

    Post savePost(HttpServletRequest httpServletRequest, PostRequest postRequest);

    Post updatePost(Integer postId,HttpServletRequest httpServletRequest, PostRequest postRequest);

    void deletePost(Integer postId);

    Post updatePostView(Integer postId);
}
