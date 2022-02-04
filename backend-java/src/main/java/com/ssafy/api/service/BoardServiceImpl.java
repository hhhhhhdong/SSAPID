package com.ssafy.api.service;

import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.api.request.BoardUpdateReq;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.BoardRepository;
import com.ssafy.db.repository.BoardRepositorySupport;
import com.ssafy.db.repository.FavoriteRepository;
import com.ssafy.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

@Service("boardService")
public class BoardServiceImpl implements BoardService {
    @Autowired
    BoardRepository boardRepository;
    @Autowired
    UserRepository userRepository;
    @Autowired
    FavoriteRepository favoriteRepository;
    @Autowired
    BoardRepositorySupport boardRepositorySupport;

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
            boardList = boardRepositorySupport.findBoardListByWriter(user.getUserSeq());
        }
        return boardList;
    }

    @Override
    public List<Board> getfavoriteBoardList(User user) {
        //join으로 sql 한번만 실행되게 수정
        List<Board> list = new ArrayList<>();
        List<Favorite> favoriteBoardList = favoriteRepository.findByUser(user);
        for(Favorite favorite: favoriteBoardList){
            list.add(favorite.getBoard());
        }
        return list;
    }

    @Override
    public Board getBoardByBoardSeq(Long boardSeq) {
        Board board = boardRepository.findByBoardSeq(boardSeq).orElse(null);
        return board;
    }

    public long checkFavorite(User user, Board board) {
        for(Favorite favorite : board.getFavoriteList()){ //게시글의 즐겨찾기들 탐색
            if(favorite.getUser().getUserSeq() == user.getUserSeq()){ //즐겨찾기의 userSeq == 해당유저의 userSeq
                return favorite.getFavoriteSeq();   //해당하는 즐겨찾기의 번호 반환
            }
        }
        return -1;
    }

    @Override
    public int favoriteBoard(User user, Board board) {
        long favoriteSeq = checkFavorite(user,board); //중복체크

        if(favoriteSeq != -1){ // 이미 등록 되어있다면
            Favorite favorite = favoriteRepository.findByFavoriteSeq(favoriteSeq);
            board.getFavoriteList().remove(favorite);
            user.getFavoriteList().remove(favorite);
            favoriteRepository.delete(favorite);
            return -1;
        }else{ // 미등록 상태라면
            Favorite favorite = new Favorite();
            favorite.setUser(user);
            favorite.setBoard(board);
            favoriteRepository.save(favorite);
            return 1;
        }
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
