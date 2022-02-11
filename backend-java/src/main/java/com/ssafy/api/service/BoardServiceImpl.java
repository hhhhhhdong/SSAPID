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
import org.apache.commons.collections4.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.function.Function;


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
        board.setBoardStatus(true);

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
    public Map<String, Object> getBoardPage(Pageable pageable) {
        Page page = boardRepository.findAll(pageable);
        Map<String, Object> map = new HashedMap<>();
        map.put("boardList", page.getContent());
        map.put("isLast", page.isLast());
        return map;
    }

    @Override
    public Map<String, Object> getBoardSearchPage(String keyword, String content, Pageable pageable) {
        Map<String, Object> map = new HashedMap<>();
        if (keyword.equals("title")) {
            Page page = boardRepository.findByBoardTitleContaining(content, pageable);
            map.put("boardList", page.getContent());
            map.put("isLast", page.isLast());
        } else if (keyword.equals("content")) {
            Page page = boardRepository.findByBoardContentContaining(content, pageable);
            map.put("boardList", page.getContent());
            map.put("isLast", page.isLast());
        } else if (keyword.equals("author")) {
            User user = userRepository.findByUserNickname(content);
            Page page = boardRepository.findByUser(user, pageable);
            map.put("boardList", page.getContent());
            map.put("isLast", page.isLast());
        } else if (keyword.equals("keyword")) {
            Page page = boardRepository.findByBoardContentContainingOrBoardTitleContaining(content, content, pageable);
            map.put("boardList", page.getContent());
            map.put("isLast", page.isLast());
        }
        return map;
    }

    @Override
    public List<Board> getfavoriteBoardList(User user) {
        List<Board> boardList = new ArrayList<>();
        for (Favorite favorite : user.getFavoriteList()) {
            boardList.add(favorite.getBoard());
        }
        return boardList;
    }

    @Override
    public Board getBoardByBoardSeq(Long boardSeq) {
        Board board = boardRepository.findByBoardSeq(boardSeq).orElse(null);
        return board;
    }

    public long checkFavorite(User user, Board board) {
        for (Favorite favorite : board.getFavoriteList()) { //게시글의 즐겨찾기들 탐색
            if (favorite.getUser().getUserSeq() == user.getUserSeq()) { //즐겨찾기의 userSeq == 해당유저의 userSeq
                return favorite.getFavoriteSeq();   //해당하는 즐겨찾기의 번호 반환
            }
        }
        return -1;
    }

    @Override
    public int favoriteBoard(User user, Board board) {
        long favoriteSeq = checkFavorite(user, board); //중복체크

        if (favoriteSeq != -1) { // 이미 등록 되어있다면
            Favorite favorite = favoriteRepository.findByFavoriteSeq(favoriteSeq);
            board.getFavoriteList().remove(favorite);
            user.getFavoriteList().remove(favorite);
            favoriteRepository.delete(favorite);
            return -1;
        } else { // 미등록 상태라면
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
