package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;


@Getter
@Setter
@ApiModel("CreateSessionRequest")
public class SessionCreateReq {
    @ApiModelProperty(name = "세션 이름", example = "SessionA")
    @NotEmpty
    String sessionName;
    @ApiModelProperty(name = "사용자 닉네임", example = "김싸피")
    @NotEmpty
    String userNickname;
}
