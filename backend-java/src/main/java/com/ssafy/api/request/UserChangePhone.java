package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@ApiModel("UserChangePhone")
public class UserChangePhone {
    @ApiModelProperty(name = "유저 Phone", example = "010-9999-9999")
    @NotEmpty
    String userPhone;
}
