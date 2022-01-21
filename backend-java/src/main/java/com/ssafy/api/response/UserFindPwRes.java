package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 비밀번호 찾기 API ([POST] /user/find-pw) 요청에 대한 응답값 정의.
 */
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
