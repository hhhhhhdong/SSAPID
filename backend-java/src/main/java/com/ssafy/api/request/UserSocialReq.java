package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;


@Getter
@Setter
@ApiModel("UserSocialReq")
public class UserSocialReq {
    @ApiModelProperty(name="유저 ID", example="ssafy205@example.com") @NotEmpty
    String userId;
    @ApiModelProperty(name="유저 Type", example="2")@NotNull
    Long userType;
}