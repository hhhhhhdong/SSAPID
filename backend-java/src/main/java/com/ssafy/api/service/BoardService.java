package com.ssafy.api.service;


import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.api.request.BoardUpdateReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;

public interface BoardService {
    void createBoard(BoardRegisterPostReq boardRegisterPostReq, User user);
    Board updateBoard(BoardUpdateReq boardUpdateReq, User user);

    Board getBoardByBoardSeq(Long boardSeq);
}
