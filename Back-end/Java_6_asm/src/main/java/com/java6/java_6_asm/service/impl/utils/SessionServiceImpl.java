package com.java6.java_6_asm.service.impl.utils;

import com.java6.java_6_asm.repositories.CartRepository;
import com.java6.java_6_asm.service.service.utils.SessionService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SessionServiceImpl implements SessionService {
    @Autowired
    HttpSession session;

    @Override
    public <T> T get(String name) {
        return (T) session.getAttribute(name);
    }

    @Override
    public void set(String name, Object value) {
        session.setAttribute(name, value);
    }

    @Override
    public void remove(String name) {
        session.removeAttribute(name);
    }
}
