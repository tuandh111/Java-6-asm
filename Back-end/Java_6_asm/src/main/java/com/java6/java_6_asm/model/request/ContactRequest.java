package com.java6.java_6_asm.model.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContactRequest {
    private String addressName;
    private String phoneNumber;
}
