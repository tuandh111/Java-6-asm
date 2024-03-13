package com.java6.java_6_asm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class Java6AsmApplication {

    public static void main(String[] args) {
        SpringApplication.run(Java6AsmApplication.class, args);
    }

}
