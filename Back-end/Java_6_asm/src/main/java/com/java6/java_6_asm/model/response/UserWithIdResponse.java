package com.java6.java_6_asm.model.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.java6.java_6_asm.entities._enum.Gender;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Nationalized;

import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserWithIdResponse {
  private Integer id;

  private String firstname;

  private String lastname;

  private String email;

  private Gender gender;

  private Date birthDay;
}
