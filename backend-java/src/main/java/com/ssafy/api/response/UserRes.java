package com.ssafy.api.response;

import com.ssafy.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	@ApiModelProperty(name="User ID")
	String userId;
	String userNickname;
	String userPhone;
	String userName;

	
	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserId(user.getUserId());
		res.setUserNickname(user.getUserNickname());
		res.setUserPhone(user.getUserPhone());
		res.setUserName(user.getUserName());

		return res;
	}
}
