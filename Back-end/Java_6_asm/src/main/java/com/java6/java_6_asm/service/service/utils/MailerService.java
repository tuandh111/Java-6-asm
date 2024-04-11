package com.java6.java_6_asm.service.service.utils;


import com.java6.java_6_asm.model.MailInfo;
import jakarta.mail.MessagingException;


public interface MailerService {
    void send(MailInfo mail) throws MessagingException;

    void sendVerify(MailInfo mail) throws MessagingException;

    void send(String to, String subject, String body) throws MessagingException;

    void queue(MailInfo mail);

    void queue(String to, String subject, String body);
}
