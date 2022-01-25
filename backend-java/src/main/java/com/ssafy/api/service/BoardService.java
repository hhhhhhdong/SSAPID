package com.ssafy.api.service;


import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;


public interface BoardService {
    void createBoard(BoardRegisterPostReq boardRegisterPostReq, User user);

}
