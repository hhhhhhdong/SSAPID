package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserLoginPostRequest")
public class UserLoginPostReq {
    @ApiModelProperty(name = "유저 ID", example = "ssafy@ssafy.com")
    String userId;
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#")
    String userPw;
}
