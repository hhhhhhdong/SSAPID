package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 유저 아이디 찾기 API ([POST] /user/find-id) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserFindIdRequest")
public class UserFindIdReq {
    @ApiModelProperty(name = "유저 이름", example = "김싸피")
    String userName;
    @ApiModelProperty(name = "유저 전화번호", example = "010-1234-5678")
    String userPhone;
}
