package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@ApiModel("UserSetInfoPostRequest")
public class UserSetInfoPostReq {

    @ApiModelProperty(name="유저 Password", example="ssafy!@#") @NotEmpty
    String userPw;
    @ApiModelProperty(name="유저 NickName", example="수정닉네임") @NotEmpty
    String userNickname;
    @ApiModelProperty(name="유저 Phone", example="010-1234-1234") @NotEmpty
    String userPhone;

}
