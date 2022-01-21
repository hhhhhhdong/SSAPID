package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QUser;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * 유저 모델 관련 디비 쿼리 생성을 위한 구현 정의.
 */
@Repository
public class UserRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QUser qUser = QUser.user;

    public Optional<User> findUserByUserId(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchOne();
        if (user == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(user);
    }

    public Optional<String> findUserId(String userName, String userPhone) {
        String userId = jpaQueryFactory.select(qUser.userId).from(qUser)
                .where(qUser.userName.eq(userName).and(qUser.userPhone.eq(userPhone))).fetchOne();
        return Optional.ofNullable(userId);
    }

    public User findUserPw(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId)).fetchFirst();
        return user;
    }

    @Transactional
    public long changeUserPw(String userId, String userPw) {
        return jpaQueryFactory.update(qUser).where(qUser.userId.eq(userId))
                .set(qUser.userPw, userPw).execute();
    }
}
