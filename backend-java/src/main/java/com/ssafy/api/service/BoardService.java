package com.ssafy.api.service;

import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.api.request.BoardUpdateReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Map;


public interface BoardService {
    void createBoard(BoardRegisterPostReq boardRegisterPostReq, User user);
    void deleteBoard(Board board);
    List<Board> getBoardList();
    Map<String,Object> getBoardPage(Pageable pageable);
    Map<String, Object> getBoardSearchPage(String keyword, String content, Pageable pageable);
    List<Board> getfavoriteBoardList(User user);
    Board updateBoard(Long boardSeq, BoardUpdateReq boardUpdateReq, User user);
    Board getBoardByBoardSeq(Long boardSeq);
    int favoriteBoard(User user, Board board);

}
