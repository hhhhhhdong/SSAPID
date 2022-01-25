package com.ssafy.api.controller;

import com.ssafy.api.request.*;
import com.ssafy.api.response.UserFindIdRes;
import com.ssafy.api.response.UserFindPwRes;
import com.ssafy.api.response.UserRes;
import com.ssafy.api.service.UserService;
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

/**
 * 유저 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "유저 API", tags = {"User"})
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/register")
    @ApiOperation(value = "회원 가입", notes = "<strong>회원가입 정보</strong>를 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<? extends BaseResponseBody> register(
            @Valid @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {

        //임의로 리턴된 User 인스턴스. 현재 코드는 회원 가입 성공 여부만 판단하기 때문에 굳이 Insert 된 유저 정보를 응답하지 않음.
        User user = userService.createUser(registerInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }


    @GetMapping("/info")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserRes> getUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);

        return ResponseEntity.status(200).body(UserRes.of(user));
    }

    @PostMapping("/setinfo")
    @ApiOperation(value = "회원정보 수정", notes = "회원정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> setInfo(@ApiIgnore Authentication authentication,
                                                              @Valid @RequestBody @ApiParam(value = "회원수정 정보", required = true) UserSetInfoPostReq userSetInfoPostReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        ResponseEntity.status(200).body(UserRes.of(user));


        user = userService.setUser(userSetInfoPostReq, userId);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원의 회원탈퇴를 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteUserInfo(@ApiIgnore Authentication authentication) {
        /**
         * 요청 헤더 액세스 토큰이 포함된 경우에만 실행되는 인증 처리이후, 리턴되는 인증 정보 객체(authentication) 통해서 요청한 유저 식별.
         * 액세스 토큰이 없이 요청하는 경우, 403 에러({"error": "Forbidden", "message": "Access Denied"}) 발생.
         */
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        User user = userService.getUserByUserId(userId);
        userService.deleteUser(user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PostMapping("/find-id")
    @ApiOperation(value = "ID 찾기", notes = "회원의 <strong>이름과 전화번호</strong>를 입력받아 해당하는 아이디를 알려준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserFindIdRes> findId(
            @RequestBody @ApiParam(value = "회원 이름, 전화번호", required = true) UserFindIdReq req) {

        String userId = userService.getUserId(req.getUserName(), req.getUserPhone());
        if (userId.isEmpty()) {
            return ResponseEntity.status(404).body(UserFindIdRes.of(404, "정보가 일치하는 유저가 없습니다.", null));
        }
        return ResponseEntity.status(200).body(UserFindIdRes.of(200, "Success", userId));
    }

    @PostMapping("/find-pw")
    @ApiOperation(value = "비밀번호 찾기", notes = "회원의 <strong>아이디</strong>를 입력받아 인증코드를 전송한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UserFindPwRes> findPw(
            @RequestBody @ApiParam(value = "회원 아이디", required = true) UserFindPwReq req) {
        String authCode = userService.getUserPw(req.getUserId());
        if (authCode.isEmpty()) {
            return ResponseEntity.status(404).body(UserFindPwRes.of(404, "정보가 일치하는 유저가 없습니다.", null));
        }
        return ResponseEntity.status(200).body(UserFindPwRes.of(200, "Success", authCode));
    }

    @PutMapping("/change-pw")
    @ApiOperation(value = "비밀번호 재설정", notes = "비밀번호를 입력받은 값으로 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> changePw(@ApiIgnore Authentication authentication,
                                                               @RequestBody @ApiParam(value = "새로운 비밀번호", required = true) UserChangePwReq req) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        String userId = userDetails.getUsername();
        userService.changeUserPw(req, userId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/check-nick/{userNickname}")
    @ApiOperation(value = "닉네임 중복 확인", notes = "입력한 닉네임에 대하여 중복 체크를 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> chekNickname(@PathVariable("userNickname") String userNickname) {
        boolean exists = userService.checkNickname(userNickname);

        if (exists) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "fail"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
    }

    @GetMapping("/check-id/{userId}")
    @ApiOperation(value = "아이디 중복 확인", notes = "입력한 아이디에 대하여 중복 체크를 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
            @ApiResponse(code = 404, message = "찾을 수 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> chekUserId(@PathVariable("userId") String userId) {
        boolean exists = userService.checkId(userId);

        if (exists) {
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "fail"));
        } else {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        }
    }
}
