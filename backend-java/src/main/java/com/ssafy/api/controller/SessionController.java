package com.ssafy.api.controller;

import com.ssafy.api.request.SessionCreateReq;
import com.ssafy.api.response.SessionCreateRes;
import io.openvidu.java.client.*;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.json.simple.JSONObject;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Api(value = "화상대화 API", tags = {"Session."})
@RestController
@RequestMapping("/session")
public class SessionController {

    private OpenVidu openVidu;
    private Map<String, Session> mapSessions = new ConcurrentHashMap<>();
    private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();
    private String OPENVIDU_URL;
    private String SECRET;

    public SessionController(@Value("${openvidu.secret}") String secret, @Value("${openvidu.url}") String openviduUrl) {
        this.SECRET = secret;
        this.OPENVIDU_URL = openviduUrl;
        this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
    }

    @PostMapping
    @ApiOperation(value = "토큰 발급", notes = "wss 주소를 반환")
    public ResponseEntity<SessionCreateRes> createSession(@RequestBody @ApiParam(value = "세션 정보") SessionCreateReq sessionInfo) throws ParseException {

        String sessionName = sessionInfo.getSessionName();
        String userNickname = sessionInfo.getUserNickname();
        SessionProperties properties = new SessionProperties.Builder().build();

        OpenViduRole role = OpenViduRole.PUBLISHER;

        ConnectionProperties connectionProperties = new ConnectionProperties.Builder()
                .type(ConnectionType.WEBRTC)
                .role(role)
                .data(userNickname)
                .build();

        if (this.mapSessions.get(sessionName) != null) {
            System.out.println("Existing session " + sessionName);
            try {
                String token = this.mapSessions.get(sessionName).createConnection(connectionProperties).getToken();
                this.mapSessionNamesTokens.get(sessionName).put(token, role);
                return ResponseEntity.status(200).body(SessionCreateRes.of(200, "Success", token));
            } catch (OpenViduJavaClientException e1) {
                return getErrorResponse(e1);
            } catch (OpenViduHttpException e2) {
                if (404 == e2.getStatus()) {
                    this.mapSessions.remove(sessionName);
                    this.mapSessionNamesTokens.remove(sessionName);
                }
            }
        }


        try {
            Session session = this.openVidu.createSession();
            String token = session.createConnection(connectionProperties).getToken();
            this.mapSessions.put(sessionName, session);
            this.mapSessionNamesTokens.put(sessionName, new ConcurrentHashMap<>());
            this.mapSessionNamesTokens.get(sessionName).put(token, role);
            return ResponseEntity.status(200).body(SessionCreateRes.of(200, "Success", token));
        } catch (Exception e) {
            return getErrorResponse(e);
        }
    }

    private ResponseEntity<SessionCreateRes> getErrorResponse(Exception e) {
        JSONObject json = new JSONObject();
        json.put("cause", e.getCause());
        json.put("error", e.getMessage());
        json.put("exception", e.getClass());
        return ResponseEntity.status(500).body(SessionCreateRes.of(500, "INTERNAL_SERVER_ERROR", null));
    }
}
