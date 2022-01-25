package com.ssafy.api.response;

import com.ssafy.common.model.response.BaseResponseBody;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BoardUpdateResponse")
public class BoardUpdateRes extends BaseResponseBody {

    public static BoardUpdateRes of(Integer statusCode, String message) {
        BoardUpdateRes res = new BoardUpdateRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

}
