package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.Comment;
import com.java6.java_6_asm.model.request.CommentRequest;
import com.java6.java_6_asm.service.service.CommentService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class CommentController {
    @Autowired
    CommentService commentService;

    @GetMapping("/auth/comment/{id}")
    public ResponseEntity<List<Comment>> findAllByProductId(@PathVariable("id") Integer id) {
        System.out.println("this is findALlByProductId");
        return ResponseEntity.ok(commentService.findByAllProductId(id));
    }

    @PostMapping("/save-comment")
    public ResponseEntity<Comment> saveComment(HttpServletRequest httpServletRequest, @RequestBody CommentRequest commentRequest) {
        System.out.println("this is save comment");
        return ResponseEntity.ok(commentService.saveComment(httpServletRequest, commentRequest));
    }
}
