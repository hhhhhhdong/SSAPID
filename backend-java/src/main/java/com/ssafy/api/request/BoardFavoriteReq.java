package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;


@Getter
@Setter
@ApiModel("BoardFavoriteReq")
public class BoardFavoriteReq {
    @NotNull
    @ApiModelProperty(name = "글 번호", example = "15")
    Long boardSeq;
}



