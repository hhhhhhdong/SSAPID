package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@ApiModel("UserCheckPwReq")
public class UserCheckPwReq {
    @ApiModelProperty(name = "유저 Password", example = "ssafy!@#") @NotEmpty
    String userPw;
}
