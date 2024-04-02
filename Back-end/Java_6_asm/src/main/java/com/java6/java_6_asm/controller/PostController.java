package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.Post;
import com.java6.java_6_asm.model.request.PostRequest;
import com.java6.java_6_asm.service.service.PostService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class PostController {
    @Autowired
    PostService postService;

    @GetMapping("/auth/post")
    public ResponseEntity<List<Post>> findAllPost() {
        return ResponseEntity.ok(postService.findAllPost());
    }

    @PostMapping("/save-post")
    public ResponseEntity<Post> savePost(HttpServletRequest httpServletRequest, @RequestBody PostRequest postRequest) {
        return ResponseEntity.ok(postService.savePost(httpServletRequest, postRequest));
    }

    @PostMapping("/update-post/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") Integer id, HttpServletRequest httpServletRequest, @RequestBody PostRequest postRequest) {
        return ResponseEntity.ok(postService.updatePost(id, httpServletRequest, postRequest));
    }

    @PostMapping("/update-post-view/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(postService.updatePostView(id));
    }

    @DeleteMapping("/delete-post/{id}")
    public ResponseEntity<String> detelePostId(@PathVariable("id") Integer id) {
        postService.deletePost(id);
        return ResponseEntity.ok("delete successfully with id: " + id);
    }
}
