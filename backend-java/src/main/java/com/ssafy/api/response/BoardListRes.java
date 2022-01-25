package com.ssafy.api.response;


import com.ssafy.db.entity.Board;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class BoardListRes {
    List<Board> boards;

    public static BoardListRes of(List<Board> boards) {
        BoardListRes res = new BoardListRes();
        res.setBoards(boards);
        return res;
    }
}
