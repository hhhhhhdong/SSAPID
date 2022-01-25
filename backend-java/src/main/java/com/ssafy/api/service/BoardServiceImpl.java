package com.ssafy.api.service;

import com.ssafy.api.request.BoardUpdateReq;
import com.ssafy.db.repository.BoardRepository;
import org.springframework.stereotype.Service;

@Service("boardService")
public class BoardServiceImpl implements BoardService{

    private BoardRepository boardRepository;

    public BoardServiceImpl(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public void updateBoard(BoardUpdateReq boardUpdateReq) {
        return boardRepository.update(boardUpdateReq.);
    }
}
