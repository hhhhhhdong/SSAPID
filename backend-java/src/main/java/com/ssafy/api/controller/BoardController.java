package com.ssafy.api.controller;


import com.ssafy.api.request.BoardRegisterPostReq;
import com.ssafy.api.request.BoardUpdateReq;
import com.ssafy.api.response.UserFindPwRes;
import com.ssafy.api.service.BoardService;
import com.ssafy.api.service.UserService;
import com.ssafy.common.auth.SsafyUserDetails;
import com.ssafy.common.model.response.BaseResponseBody;
import com.ssafy.db.entity.Board;
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
    @Autowired
    UserService userService;

    @PostMapping
    @ApiOperation(value = "게시글 등록", notes = "<strong>작성한 내용의 정보</strong>를 게시판에 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> register(@ApiIgnore Authentication authentication,
                                                               @Valid @RequestBody @ApiParam(value = "작성한 내용의 정보", required = true) BoardRegisterPostReq registerInfo) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        boardService.createBoard(registerInfo,user);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/{boardSeq}")
    @ApiOperation(value = "게시글 수정", notes = "<strong>작성한 내용의 정보</strong>를 게시판에 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> updateBoard(@ApiIgnore Authentication authentication,
                                                               @Valid @RequestBody @ApiParam(value = "작성한 내용의 정보", required = true) BoardUpdateReq boardUpdateReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Board board = boardService.getBoardByBoardSeq(boardUpdateReq.getBoardSeq());
        board = boardService.updateBoard(boardUpdateReq, user);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @DeleteMapping("/{boardSeq}")
    @ApiOperation(value = "게시글 삭제", notes = "게시글 삭제를 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteBoard(@ApiIgnore Authentication authentication,
                                                                     @PathVariable("boardSeq") Long boardSeq) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        Board board = boardService.getBoardByBoardSeq(boardSeq);
        if (user.getUserNickname().equals(board.getUser().getUserNickname())) {
            boardService.deleteBoard(board);
        } else {
            return ResponseEntity.status(404).body(BaseResponseBody.of(401, "삭제 권한이 없습니다."));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "삭제 성공"));
    }
}
