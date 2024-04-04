package com.java6.java_6_asm.service.impl;

import com.java6.java_6_asm.entities.Favorites;
import com.java6.java_6_asm.entities.User;
import com.java6.java_6_asm.entities.product.Product;
import com.java6.java_6_asm.exception.NotFoundException;
import com.java6.java_6_asm.model.request.FavoriteRequest;
import com.java6.java_6_asm.repositories.FavoritesRepository;
import com.java6.java_6_asm.repositories.UserRepository;
import com.java6.java_6_asm.repositories.product.ProductRepository;
import com.java6.java_6_asm.security.service.GetTokenRefreshToken;
import com.java6.java_6_asm.security.service.JwtService;
import com.java6.java_6_asm.service.service.FavoritesService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class FavoritesServiceImpl implements FavoritesService {
    @Autowired
    FavoritesRepository favoritesRepository;
    @Autowired
    JwtService jwtService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Favorites> findAllByUserId(HttpServletRequest httpServletRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(()->new NotFoundException("Not found user with email: "+ email));
        return favoritesRepository.findByUserId(user.getId());
    }

    @Override
    public Favorites saveFavorite(HttpServletRequest httpServletRequest, FavoriteRequest favoriteRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(()->new NotFoundException("Not found user with email: "+ email));
        Product product= productRepository.findById(favoriteRequest.getProductId()).orElseThrow(()-> new NotFoundException(" Not found Product with id: "+ favoriteRequest.getProductId()));
        Favorites favorites = new Favorites();
        favorites.setCreateAt(new Date());
        favorites.setUser(user);
        favorites.setIsDelete(false);
        favorites.setProductId(product);
        favoritesRepository.save(favorites);
        return favorites;
    }

    @Override
    public void deleteUserIdAndProductId(HttpServletRequest httpServletRequest, FavoriteRequest favoriteRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(()->new NotFoundException("Not found user with email: "+ email));
        Product product= productRepository.findById(favoriteRequest.getProductId()).orElseThrow(()-> new NotFoundException(" Not found Product with id: "+ favoriteRequest.getProductId()));
        try {
            favoritesRepository.deleteByUserAndProduct(user.getId(), product.getProductId());
            System.out.println("ProductId: "+product.getProductId()+" "+ user.getId());
        }catch (Exception e){
            e.printStackTrace();
        }

    }

    @Override
    public List<Favorites> checkUserIdAndProductId(HttpServletRequest httpServletRequest, FavoriteRequest favoriteRequest) {
        String token = GetTokenRefreshToken.getToken(httpServletRequest);
        String email = jwtService.extractUsername(token);
        User user = userRepository.findByEmail(email).orElseThrow(()->new NotFoundException("Not found user with email: "+ email));
        Product product= productRepository.findById(favoriteRequest.getProductId()).orElseThrow(()-> new NotFoundException(" Not found Product with id: "+ favoriteRequest.getProductId()));
        return favoritesRepository.findByUserIDAndProductID(user.getId(), product.getProductId());
    }
}
