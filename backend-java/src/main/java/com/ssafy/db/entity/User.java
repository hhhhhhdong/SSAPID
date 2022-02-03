package com.ssafy.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * 유저 모델 정의.
 */
@Entity
@Table(name = "user")
@Getter
@Setter
public class User extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "user_seq")
    Long userSeq;
    @Column(name = "user_id", nullable = false) @NotNull
    String userId;
    @Column(name = "user_pw", nullable = false) @NotNull @JsonIgnore @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String userPw;
    @Column(name = "user_nickname", nullable = false) @NotNull
    String userNickname;
    @Column(name = "user_phone", nullable = false) @NotNull
    String userPhone;
    @Column(name = "user_name", nullable = false) @NotNull
    String userName;
    @Column(name = "user_type", nullable = false) @NotNull
    Long userType;

    @OneToMany(mappedBy = "user",fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    Set<Board> boardList = new HashSet<>();
}