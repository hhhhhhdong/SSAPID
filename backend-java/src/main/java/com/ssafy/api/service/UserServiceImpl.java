package com.ssafy.api.service;

import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserSetInfoPostReq;
import com.ssafy.db.entity.User;
import com.ssafy.db.repository.UserRepository;
import com.ssafy.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    @Override
    public User createUser(UserRegisterPostReq userRegisterInfo) {
        User user = new User();
        user.setUserId(userRegisterInfo.getUserId());
        user.setUserName(userRegisterInfo.getUserName());
        user.setUserNickname(userRegisterInfo.getUserNickname());
        user.setUserPhone(userRegisterInfo.getUserPhone());
        // 보안을 위해서 유저 패스워드 암호화 하여 디비에 저장.
        user.setUserPw(passwordEncoder.encode(userRegisterInfo.getUserPw()));
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
        String userId = "";
        if (userRepositorySupport.findUserId(userName, userPhone).isPresent())
            userId = userRepositorySupport.findUserId(userName, userPhone).get();
        return userId;
    }

    @Override
    public boolean checkNickname(String userNickname) {
        return userRepository.existsByUserNickname(userNickname);
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
