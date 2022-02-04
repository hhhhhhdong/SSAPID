package com.ssafy.api.controller;

import com.ssafy.api.response.CreateSessionRes;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "[임시] 화상대화 API", tags = {"Session."})
@RestController
@RequestMapping("/session")
public class SessionController {

    // URL where our OpenVidu server is listening
    private String OPENVIDU_URL;
    // Secret shared with our OpenVidu server
    private String SECRET;

    public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
    }

    @ApiOperation(value = "토큰 얻기", notes = "get token.")
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<CreateSessionRes> createSession() throws OpenViduJavaClientException, OpenViduHttpException {
        // create Session
        OpenVidu openvidu = new OpenVidu(OPENVIDU_URL, SECRET);
        SessionProperties properties = new SessionProperties.Builder().build();
        Session session = openvidu.createSession(properties);

        // create Connection
        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(OpenViduRole.PUBLISHER)
                .data("user_data")
                .build();
        Connection connection = session.createConnection(connectionProperties);
        String token = connection.getToken(); // Send this string to the client side

        return ResponseEntity.status(200).body(CreateSessionRes.of(200, "Success", token));
    }
}
