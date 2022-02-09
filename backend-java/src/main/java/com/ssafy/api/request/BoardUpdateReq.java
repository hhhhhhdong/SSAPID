package com.ssafy.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;


@Getter
@Setter
@ApiModel("BoardUpdateRequest")
public class BoardUpdateReq {
    @ApiModelProperty(name = "글 제목", example = "Example Title")
    @NotEmpty
    String boardTitle;
    @ApiModelProperty(name = "글 내용", example = "Hi, This is example Content !!")
    @NotEmpty
    String boardContent;
    @ApiModelProperty(name = "마감일", example = "2022-09-25")
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    LocalDate deadline;
}
