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

    public static BoardRes of(Board board, User user) {
        BoardRes res = new BoardRes();
        res.setBoardSeq(board.getBoardSeq());
        res.setBoardTitle(board.getBoardTitle());
        res.setBoardContent(board.getBoardContent());
        res.setCreatedAt(board.getCreatedAt());
        res.setDeadline(board.getDeadline());
        res.setAuthor(board.getUser().getUserNickname());
        res.setIsLike("false");
        for (Favorite favorite : board.getFavoriteList()) { //게시글의 즐겨찾기들 탐색
            if (favorite.getUser().getUserSeq() == user.getUserSeq()) { //즐겨찾기의 userSeq == 해당유저의 userSeq
                res.setIsLike("true");
                break;
            }
        }

        return res;
    }
}