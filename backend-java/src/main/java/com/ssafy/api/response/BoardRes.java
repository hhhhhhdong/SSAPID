package com.ssafy.api.response;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalDateTime;


@Getter
@Setter
@ApiModel("BoardResponse")
public class BoardRes {
    long boardSeq;
    String boardTitle;
    String boardContent;
    LocalDateTime createdAt;
    LocalDate deadline;
    String author;
    String isLike;
    boolean boardStatus;

    public static BoardRes of(Board board, User user) {
        BoardRes res = new BoardRes();
        res.setBoardSeq(board.getBoardSeq());
        res.setBoardTitle(board.getBoardTitle());
        res.setBoardContent(board.getBoardContent());
        res.setCreatedAt(board.getCreatedAt());
        res.setDeadline(board.getDeadline());
        res.setAuthor(board.getUser().getUserNickname());
        res.setIsLike("false");
        for (Favorite favorite : board.getFavoriteList()) {
            if (favorite.getUser().getUserSeq() == user.getUserSeq()) {
                res.setIsLike("true");
                break;
            }
        }
        res.setBoardStatus(board.getBoardStatus());

        return res;
    }
}