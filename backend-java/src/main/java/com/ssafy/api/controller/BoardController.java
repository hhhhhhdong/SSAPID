package com.ssafy.api.controller;

import com.ssafy.api.request.UserSetInfoPostReq;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.BoardService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.User;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@Api(value = "게시판 API", tags = {"Board"})
@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    BoardService boardService;

    @PutMapping("/board/{boradSeq}/update")
    @ApiOperation(value = "게시글 수정", notes = "게시글 수정을 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateBoard() {

    }
}
