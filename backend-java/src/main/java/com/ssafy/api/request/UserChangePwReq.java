package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 비밀번호 재설정 API ([PUT] /user/change-pw) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostRequest")
public class UserChangePwReq {
    @ApiModelProperty(name = "유저 ID", example = "ssafy@ssafy.com")
    String userId;
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#")
    String userPw;
}
