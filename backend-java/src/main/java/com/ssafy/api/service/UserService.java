package com.ssafy.api.service;

import com.ssafy.api.request.UserChangePwReq;
import com.ssafy.api.request.UserRegisterPostReq;
import com.ssafy.api.request.UserSetInfoPostReq;
import com.ssafy.api.request.UserSocialReq;
import com.ssafy.db.entity.User;


public interface UserService {
	User createUser(UserRegisterPostReq userRegisterInfo);
	void createSocialUser(UserSocialReq socialRegisterInfo);
	User getUserByUserId(String userId);
	User getSocialUserByUserId(String userId);
	void setUser(UserSetInfoPostReq userSetInfoPostReq, User user);
	void deleteUser(User user);
	String getUserId(String userName, String userPhone);
	String getUserPw(String userId);
	void changeUserPw(UserChangePwReq userChangePwReq);
	void changeUserNickname(User user,String userNickname);
	void changeUserPhone(User user, String userPhone);
	boolean checkNickname(String userNickname);
	boolean checkId(String userId);
	boolean chekPw(User user, String password);
}