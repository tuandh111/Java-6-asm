package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Favorites;
import jakarta.servlet.http.HttpServletRequest;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface FavoritesService {
    List<Favorites> findAllByUserId();

    Favorites saveFavorite(HttpServletRequest httpServletRequest, Integer productId);


}
