package com.java6.java_6_asm.controller;

import com.java6.java_6_asm.entities.Favorites;
import com.java6.java_6_asm.model.request.FavoriteRequest;
import com.java6.java_6_asm.service.service.FavoritesService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class FavoritesController {
    @Autowired
    FavoritesService favoritesService;

    @GetMapping("/favorites")
    public ResponseEntity<List<Favorites>> findAllUserId(HttpServletRequest httpServletRequest) {
        return ResponseEntity.ok(favoritesService.findAllByUserId(httpServletRequest));
    }

    @PostMapping("/check-favorites")
    public ResponseEntity<List<Favorites>> checkUserIdAndProductId(HttpServletRequest httpServletRequest, @RequestBody FavoriteRequest favoriteRequest) {
        return ResponseEntity.ok(favoritesService.checkUserIdAndProductId(httpServletRequest, favoriteRequest));
    }

    @PostMapping("/save-favorites")
    public ResponseEntity<?> saveFavorites(HttpServletRequest httpServletRequest, @RequestBody FavoriteRequest favoriteRequest) {
        return ResponseEntity.ok(favoritesService.saveFavorite(httpServletRequest, favoriteRequest));
    }

    @PostMapping("/delete-favorites")
    public ResponseEntity<?> deleteFavorites(HttpServletRequest httpServletRequest, @RequestBody FavoriteRequest favoriteRequest) {
        favoritesService.deleteUserIdAndProductId(httpServletRequest, favoriteRequest);
        Map<String, Object> jsonError = new HashMap<>();
        jsonError.put("message", "Delete successfully");
        return ResponseEntity.ok(jsonError);
    }
}
