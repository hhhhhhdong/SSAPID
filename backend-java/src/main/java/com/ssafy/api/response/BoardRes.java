package com.ssafy.api.response;

import com.ssafy.db.entity.Board;
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
    String userId;

    public static BoardRes of(Board board) {
        BoardRes res = new BoardRes();
        res.setBoardSeq(board.getBoardSeq());
        res.setBoardTitle(board.getBoardTitle());
        res.setBoardContent(board.getBoardContent());
        res.setCreatedAt(board.getCreatedAt());
        res.setDeadline(board.getDeadline());
        res.setUserId(board.getUser().getUserId());
        return res;
    }
}