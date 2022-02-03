package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserLoginPostResponse")
public class UserLoginPostRes extends BaseResponseBody {
    @ApiModelProperty(name = "JWT 인증 토큰", example = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN...")
    String accessToken;
    @ApiModelProperty(name = "userNickname", example = "구미_2반_김은준")
    String userNickname;
    @ApiModelProperty(name = "userType", example = "1")
    Long userType;

    public static UserLoginPostRes of(Integer statusCode, String message, String accessToken, String userNickname, Long userType) {
        UserLoginPostRes res = new UserLoginPostRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAccessToken(accessToken);
        res.setUserNickname(userNickname);
        res.setUserType(userType);
        return res;
    }
}
