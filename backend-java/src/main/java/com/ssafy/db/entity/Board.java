package com.ssafy.db.entity;

import com.sun.istack.NotNull;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "board")
@Getter
@Setter
public class Board extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "board_seq")
    Long boardSeq;
    @ManyToOne
    @JoinColumn(name = "user_seq", nullable = false) @NotNull
    User user;
    @Column(name = "board_title", nullable = false, length = 100)
    String boardTitle;
    @Column(name = "board_content", nullable = false, length = 1000)
    String boardContent;
    @Column(name = "deadline", nullable = false) @NotNull
    LocalDateTime deadline;

}
