package com.ssafy.api.service;

import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserSetInfoPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Random;

/**
 * 유저 관련 비즈니스 로직 처리를 위한 서비스 구현 정의.
 */
@Service("userService")
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    UserRepositorySupport userRepositorySupport;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JavaMailSender javaMailSender;

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setUserPw(passwordEncoder.encode(userRegisterInfo.getUserPw()));
        user.setUserNickname(userRegisterInfo.getUserNickname());
        user.setUserPhone(userRegisterInfo.getUserPhone());
        user.setUserName(userRegisterInfo.getUserName());
        user.setUserType(userRegisterInfo.getUserType());

        return userRepository.save(user);
    }

    @Override
    public User getUserByUserId(String userId) {
        // 디비에 유저 정보 조회 (userId 를 통한 조회).
        User user = userRepositorySupport.findUserByUserId(userId).get();
        return user;

    }

    @Override
    public void deleteUser(User user) {
        userRepository.delete(user);
    }

    @Override
    public String getUserId(String userName, String userPhone) {
        return userRepositorySupport.findUserId(userName, userPhone).orElse("");
    }

    @Override
    public String getUserPw(String userId) {
        if (Objects.isNull(userRepositorySupport.findUserPw(userId))) { // 일치하는 회원이 없는 경우
            return "";
        }
        // 난수 생성, 이메일 전송
        Random random = new Random();
        String key = "";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(userId);

        for (int i = 0; i < 3; i++) {
            int index = random.nextInt(25) + 65;
            key += (char) index;
        }
        int numIndex = random.nextInt(8999) + 1000;
        key += numIndex;
        message.setSubject("인증번호 입력을 위한 메일 전송입니다.");
        message.setText("인증 번호 : " + key);
        javaMailSender.send(message);
        return key;
    }

    @Override
    public void changeUserPw(UserChangePwReq userChangePwReq) {
        userRepositorySupport.changeUserPw(userChangePwReq.getUserId(), passwordEncoder.encode(userChangePwReq.getUserPw()));
    }

    public boolean checkNickname(String userNickname) {
        return userRepository.existsByUserNickname(userNickname);
    }

    @Override
    public boolean checkId(String userId) {
        return userRepositorySupport.checkId(userId);
    }

    @Override
    public User setUser(UserSetInfoPostReq userSetInfoPostReq, String userId) {

        User user = getUserByUserId(userId);

        user.setUserPw(passwordEncoder.encode(userSetInfoPostReq.getUserPw()));
        user.setUserNickname(userSetInfoPostReq.getUserNickname());
        user.setUserPhone(userSetInfoPostReq.getUserPhone());

        return userRepository.save(user);
    }
}
