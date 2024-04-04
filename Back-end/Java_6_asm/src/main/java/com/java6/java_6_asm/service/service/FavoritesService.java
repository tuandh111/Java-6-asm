package com.java6.java_6_asm.service.service;

import com.java6.java_6_asm.entities.Favorites;
import com.java6.java_6_asm.model.request.FavoriteRequest;
import jakarta.servlet.http.HttpServletRequest;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

public interface FavoritesService {
    List<Favorites> findAllByUserId(HttpServletRequest httpServletRequest);

    Favorites saveFavorite(HttpServletRequest httpServletRequest, FavoriteRequest favoriteRequest);

    void deleteUserIdAndProductId(HttpServletRequest httpServletRequest, FavoriteRequest favoriteRequest);

    List<Favorites> checkUserIdAndProductId(HttpServletRequest httpServletRequest, FavoriteRequest favoriteRequest);
}
