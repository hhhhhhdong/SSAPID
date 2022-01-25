package com.ssafy.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import java.time.LocalDateTime;

@Getter
@Setter
@ApiModel("BoardUpdateRequest")
public class BoardUpdateReq {

    @ApiModelProperty(name="게시글 제목", example="프론트엔트 팀원 구합니다.") @NotEmpty
    String boradTitle;
    @ApiModelProperty(name="게시글 내용", example="리액트로 프로젝트 진행하려합니다...") @NotEmpty
    String boardContent;
    @ApiModelProperty(name="마감 기한", example="2021.01.25") @NotEmpty
    LocalDateTime deadLine;
}
