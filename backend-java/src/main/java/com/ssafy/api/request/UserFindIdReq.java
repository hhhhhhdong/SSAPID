package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserFindIdRequest")
public class UserFindIdReq {
    @ApiModelProperty(name = "유저 이름", example = "김싸피")
    String userName;
    @ApiModelProperty(name = "유저 전화번호", example = "010-1234-5678")
    String userPhone;
}
