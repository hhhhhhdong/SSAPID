package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
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

    public static BoardListRes of(Integer statusCode, String message, List<Board> boardList) {
        BoardListRes res = new BoardListRes();
        List<Map<String, Object>> boardInfos = new ArrayList<>();

        for (Board board : boardList) {
            Map<String, Object> boardInfo = new HashMap<>();
            boardInfo.put("boardSeq", board.getBoardSeq());
            boardInfo.put("boardTitle", board.getBoardTitle());
            boardInfo.put("createdAt", board.getCreatedAt());
            boardInfo.put("deadline", board.getDeadline());
            boardInfo.put("userId", board.getUser().getUserId());
            boardInfos.add(boardInfo);
        }

        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setBoardInfos(boardInfos);
        return res;
    }
}
