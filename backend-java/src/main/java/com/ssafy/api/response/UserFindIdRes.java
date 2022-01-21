package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 아이디 찾기 API ([POST] /user/find-id) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("UserFindIdResponse")
public class UserFindIdRes extends BaseResponseBody {
    @ApiModelProperty(name = "유저 ID", example = "ssafy")
    String userId;

    public static UserFindIdRes of(Integer statusCode, String message, String userId) {
        UserFindIdRes res = new UserFindIdRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setUserId(userId);
        return res;
    }
}
