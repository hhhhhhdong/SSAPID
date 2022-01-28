package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserFindPwResponse")
public class UserFindPwRes extends BaseResponseBody {
    @ApiModelProperty(name = "인증 코드", example = "ABC1234")
    String authCode;

    public static UserFindPwRes of(Integer statusCode, String message, String authCode) {
        UserFindPwRes res = new UserFindPwRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setAuthCode(authCode);
        return res;
    }
}
