package com.ssafy.db.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "favorite")
@Getter
@Setter
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "favorite_seq")
    Long favoriteSeq;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_seq")
    User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_seq")
    Board board;
}
