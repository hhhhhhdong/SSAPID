package com.ssafy.api.service;

import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("boardService")
public class BoardServiceImpl implements BoardService{
    @Autowired
    BoardRepository boardRepository;
    @Override
    public void createBoard(BoardRegisterPostReq boardRegisterPostReq, User user) {
        Board board = new Board();
        board.setUser(user);
        board.setBoardTitle(boardRegisterPostReq.getBoardTitle());
        board.setBoardContent(boardRegisterPostReq.getBoardContent());
        board.setDeadline(boardRegisterPostReq.getDeadline());

        boardRepository.save(board);
    }
}
