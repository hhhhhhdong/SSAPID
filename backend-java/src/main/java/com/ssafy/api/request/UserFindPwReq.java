package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 비밀번호 찾기 API ([POST] /user/find-pw) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserFindPwRequest")
public class UserFindPwReq {
    @ApiModelProperty(name = "유저 ID", example = "ssafy@ssafy.com")
    String userId;
}