package com.ssafy.api.service;

import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserSetInfoPostReq;
import com.ssafy.api.request.UserSocialReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.Random;


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
        user.setUserPw(passwordEncoder.encode(userRegisterInfo.getUserPw()));
        user.setUserNickname(userRegisterInfo.getUserNickname());
        user.setUserPhone(userRegisterInfo.getUserPhone());
        user.setUserName(userRegisterInfo.getUserName());
        user.setUserType(userRegisterInfo.getUserType());

        return userRepository.save(user);
    }

    @Override
    public void createSocialUser(UserSocialReq socialRegisterInfo) {
        User user = new User();
        user.setUserId("Social_"+socialRegisterInfo.getUserId());
        user.setUserType(socialRegisterInfo.getUserType());

        String userNickname = RandomStringUtils.random(15, true, true);
        while(checkId(userNickname)){
            userNickname = RandomStringUtils.random(15, true, true);
        }
        user.setUserNickname(userNickname);
        user.setUserPw(passwordEncoder.encode("sociallogin"));
        user.setUserPhone("000-0000-0000");
        user.setUserName("social_guest");
        userRepository.save(user);
    }

    @Override
    public User getUserByUserId(String userId) {
        User user = userRepositorySupport.findUserByUserId(userId).get();
        return user;

    }

    @Override
    public User getSocialUserByUserId(String userId) {
        User user = userRepositorySupport.findSocialUserByUserId(userId).get();
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
        if (Objects.isNull(userRepositorySupport.findUserPw(userId))) {
            return "";
        }

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

    @Override
    public void changeUserNickname(User user, String userNickname) {
        user.setUserNickname(userNickname);
        userRepository.save(user);
    }
    @Override
    public void changeUserPhone(User user, String userPhone) {
        user.setUserPhone(userPhone);
        userRepository.save(user);
    }

    public boolean checkNickname(String userNickname) {
        return userRepository.existsByUserNickname(userNickname);
    }

    @Override
    public boolean checkId(String userId) {
        return userRepositorySupport.checkId(userId);
    }

    @Override
    public boolean chekPw(User user,String password) {

        if (passwordEncoder.matches(password, user.getUserPw())) {
            return true;
        }
        return false;
    }

    @Override
    public void setUser(UserSetInfoPostReq userSetInfoPostReq, User user) {
        user.setUserPw(passwordEncoder.encode(userSetInfoPostReq.getUserPw()));
        user.setUserNickname(userSetInfoPostReq.getUserNickname());
        user.setUserPhone(userSetInfoPostReq.getUserPhone());
        userRepository.save(user);
    }
}
