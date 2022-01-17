package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

/**
 * 유저 모델 정의.
 */
@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends BaseTimeEntity {

    @Id @Column(name = "user_id", nullable = false) @NotNull
    String userId;
    @Column(name = "user_pw", nullable = false) @NotNull @JsonIgnore @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String userPw;
    @Column(name = "user_nickname", nullable = false) @NotNull
    String userNickname;
    @Column(name = "user_phone", nullable = false) @NotNull
    String userPhone;
//    @Column(name = "created_at", nullable = false) @NotNull
//    Timestamp createdAt;
    @Column(name = "is_Destroyed", nullable = false) @NotNull
    Boolean isDestroyed;
    @Column(name = "user_type", nullable = false) @NotNull
    int userType;
}