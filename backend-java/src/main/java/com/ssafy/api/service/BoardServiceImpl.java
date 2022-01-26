package com.ssafy.api.service;

import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.api.request.BoardUpdateReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    UserRepository userRepository;

    @Override
    public void createBoard(BoardRegisterPostReq boardRegisterPostReq, User user) {
        Board board = new Board();
        board.setUser(user);
        board.setBoardTitle(boardRegisterPostReq.getBoardTitle());
        board.setBoardContent(boardRegisterPostReq.getBoardContent());
        board.setDeadline(boardRegisterPostReq.getDeadline());

        boardRepository.save(board);
    }

    @Override
    public void deleteBoard(Board board) {
        boardRepository.delete(board);
    }

    @Override
    public List<Board> getBoardList() {
        return boardRepository.findAll();
    }

    @Override
    public List<Board> getBoardSearchList(String keyword, String content) {
        List<Board> boardList = new ArrayList<>();
        if (keyword.equals("title")){
            boardList = boardRepository.findByBoardTitleContaining(content);
        }else if(keyword.equals("content")){
            boardList = boardRepository.findByBoardContentContaining(content);
        }else if(keyword.equals("writer")){
            User user = userRepository.findByUserNickname(content);
            boardList = boardRepository.findByUserContaining(user);
        }
        return boardList;
    }

    @Override
    public Board getBoardByBoardSeq(Long boardSeq) {
        Board board = boardRepository.findBoardByBoardSeq(boardSeq).orElse(null);
        return board;
    }

    @Override
    public Board updateBoard(Long boardSeq, BoardUpdateReq boardUpdateReq, User user) {
        Board board = getBoardByBoardSeq(boardSeq);
        board.setUser(user);
        board.setBoardTitle(boardUpdateReq.getBoardTitle());
        board.setBoardContent(boardUpdateReq.getBoardContent());
        board.setDeadline(boardUpdateReq.getDeadline());

        return boardRepository.save(board);
    }

}
