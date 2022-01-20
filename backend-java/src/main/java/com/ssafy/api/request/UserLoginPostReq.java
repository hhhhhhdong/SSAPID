package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 로그인 API ([POST] /login) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {
    @ApiModelProperty(name = "유저 ID", example = "ssafy")
    String userId;
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#")
    String userPw;
}
