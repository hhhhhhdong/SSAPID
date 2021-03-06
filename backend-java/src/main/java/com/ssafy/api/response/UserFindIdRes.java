package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


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
