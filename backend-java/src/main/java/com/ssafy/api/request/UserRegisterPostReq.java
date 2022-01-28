package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name="유저 ID", example="ssafy205@example.com") @NotEmpty
	String userId;
	@ApiModelProperty(name="유저 Password", example="ssafy") @NotEmpty
	String userPw;
	@ApiModelProperty(name="유저 NickName", example="구미_4반_김은준") @NotEmpty
	String userNickname;
	@ApiModelProperty(name="유저 Phone", example="010-1234-1234") @NotEmpty
	String userPhone;
	@ApiModelProperty(name="유저 Name", example="김은준") @NotEmpty
	String userName;
	@ApiModelProperty(name="유저 Type", example="1")@NotNull
	Long userType;
}
