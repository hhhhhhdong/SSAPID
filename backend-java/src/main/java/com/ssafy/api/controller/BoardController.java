package com.ssafy.api.controller;

import io.swagger.annotations.Api;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "게시판 API", tags = {"Board"})
@RestController
@RequestMapping("/board")
public class BoardController {
}
