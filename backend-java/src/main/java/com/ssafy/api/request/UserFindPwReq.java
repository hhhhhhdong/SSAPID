package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserFindPwRequest")
public class UserFindPwReq {
    @ApiModelProperty(name = "유저 ID", example = "ssafy@ssafy.com")
    String userId;
}