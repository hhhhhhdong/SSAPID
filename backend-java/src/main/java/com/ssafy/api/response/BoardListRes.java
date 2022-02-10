package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Getter
@Setter
@ApiModel("BoardListResponse")
public class BoardListRes extends BaseResponseBody {

    List<Map<String, Object>> boardInfos;
    boolean isLast;

    public static BoardListRes of(Integer statusCode, String message, List<Board> boardList, User user, boolean isLast) {
        BoardListRes res = new BoardListRes();
        List<Map<String, Object>> boardInfos = new ArrayList<>();

        for (Board board : boardList) {
            String isLike = "false";
            Map<String, Object> boardInfo = new HashMap<>();
            boardInfo.put("boardSeq", board.getBoardSeq());
            boardInfo.put("boardTitle", board.getBoardTitle());
            boardInfo.put("createdAt", board.getCreatedAt());
            boardInfo.put("deadline", board.getDeadline());
            boardInfo.put("author", board.getUser().getUserNickname());
            for (Favorite favorite : board.getFavoriteList()) { //게시글의 즐겨찾기들 탐색
                if (favorite.getUser().getUserSeq() == user.getUserSeq()) { //즐겨찾기의 userSeq == 해당유저의 userSeq
                    isLike = "true";
                    break;
                }
            }
            boardInfo.put("boardStatus",board.getBoardStatus());
            boardInfo.put("isLike", isLike);
            boardInfos.add(boardInfo);
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardInfos(boardInfos);
        res.setLast(isLast);
        return res;
    }

    public static BoardListRes of(Integer statusCode, String message, List<Board> boardList, User user) {
        BoardListRes res = new BoardListRes();
        List<Map<String, Object>> boardInfos = new ArrayList<>();

        for (Board board : boardList) {
            String isLike = "false";
            Map<String, Object> boardInfo = new HashMap<>();
            boardInfo.put("boardSeq", board.getBoardSeq());
            boardInfo.put("boardTitle", board.getBoardTitle());
            boardInfo.put("createdAt", board.getCreatedAt());
            boardInfo.put("deadline", board.getDeadline());
            boardInfo.put("author", board.getUser().getUserNickname());
            for (Favorite favorite : board.getFavoriteList()) { //게시글의 즐겨찾기들 탐색
                if (favorite.getUser().getUserSeq() == user.getUserSeq()) { //즐겨찾기의 userSeq == 해당유저의 userSeq
                    isLike = "true";
                    break;
                }
            }
            boardInfo.put("boardStatus",board.getBoardStatus());
            boardInfo.put("isLike", isLike);
            boardInfos.add(boardInfo);
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardInfos(boardInfos);

        return res;
    }

    public static BoardListRes of(Integer statusCode, String message, List<Board> boardList) {
        BoardListRes res = new BoardListRes();
        List<Map<String, Object>> boardInfos = new ArrayList<>();

        for (Board board : boardList) {
            Map<String, Object> boardInfo = new HashMap<>();
            boardInfo.put("boardSeq", board.getBoardSeq());
            boardInfo.put("boardTitle", board.getBoardTitle());
            boardInfo.put("createdAt", board.getCreatedAt());
            boardInfo.put("deadline", board.getDeadline());
            boardInfo.put("author", board.getUser().getUserNickname());
            boardInfo.put("boardStatus",board.getBoardStatus());
            boardInfos.add(boardInfo);
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardInfos(boardInfos);
        return res;
    }
}
