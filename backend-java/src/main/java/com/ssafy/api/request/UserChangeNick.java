package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@ApiModel("UserChangeNick")
public class UserChangeNick {
    @ApiModelProperty(name = "유저 Nickname", example = "수정닉네임")
    @NotEmpty
    String userNickname;
}
