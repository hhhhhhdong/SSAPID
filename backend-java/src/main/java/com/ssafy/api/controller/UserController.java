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
import java.util.NoSuchElementException;


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
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<? extends BaseResponseBody> register(
            @Valid @RequestBody @ApiParam(value = "회원가입 정보", required = true) UserRegisterPostReq registerInfo) {
        try {
            userService.getUserbyUserNameAndUserPhone(registerInfo.getUserName(), registerInfo.getUserPhone());
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "인증 실패"));
        } catch (NoSuchElementException e) {
            userService.createUser(registerInfo);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

        }
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

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        return ResponseEntity.status(200).body(UserRes.of(user));
    }

    @PutMapping("/update")
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
        User user = userDetails.getUser();
        userService.setUser(userSetInfoPostReq, user);

        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));

    }

    @DeleteMapping("/delete")
    @ApiOperation(value = "회원 탈퇴", notes = "로그인한 회원의 회원탈퇴를 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> deleteUserInfo(@ApiIgnore Authentication authentication) {

        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
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
    public ResponseEntity<? extends BaseResponseBody> changePw(@RequestBody @ApiParam(value = "새로운 비밀번호", required = true) UserChangePwReq req) {
        userService.changeUserPw(req);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/change-nick")
    @ApiOperation(value = "닉네임 변경", notes = "닉네임을 입력받은 값으로 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> changeNick(@ApiIgnore Authentication authentication,
                                                                 @RequestBody @ApiParam(value = "변경할 닉네임", required = true) UserChangeNick req) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.changeUserNickname(user, req.getUserNickname());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @PutMapping("/change-phone")
    @ApiOperation(value = "전화번호 변경", notes = "전화번호를 입력받은 값으로 변경한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> changePhone(@ApiIgnore Authentication authentication,
                                                                  @RequestBody @ApiParam(value = "변경할 번호", required = true) UserChangePhone req) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();
        userService.changeUserPhone(user, req.getUserPhone());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/check-nick/{userNickname}")
    @ApiOperation(value = "닉네임 중복 확인", notes = "입력한 닉네임에 대하여 중복 체크를 진행한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "실패"),
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

    @PostMapping("check-pw")
    @ApiOperation(value = "비밀번호 확인", notes = "입력한 비밀번호와 로그인한 사용자의 비밀번호를 비교한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<? extends BaseResponseBody> chekPw(@ApiIgnore Authentication authentication,
                                                             @Valid @RequestBody @ApiParam(value = "비밀번호", required = true) UserCheckPwReq userCheckPwReq) {
        SsafyUserDetails userDetails = (SsafyUserDetails) authentication.getDetails();
        User user = userDetails.getUser();

        try {
            if (userService.chekPw(user, userCheckPwReq.getUserPw())) {
                return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
            }
            return ResponseEntity.status(401).body(BaseResponseBody.of(401, "Invalid Password"));
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(404).body(BaseResponseBody.of(404, "사용자 없음"));
        }

    }

}
