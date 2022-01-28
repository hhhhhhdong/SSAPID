package com.ssafy.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QUser;
import com.ssafy.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


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

    public Optional<User> findSocialUserByUserId(String userId){
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId).and(qUser.userType.eq(Long.valueOf(2)))).fetchOne();
        if (user == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(user);
    }

    public Optional<String> findUserId(String userName, String userPhone) {
        String userId = jpaQueryFactory.select(qUser.userId).from(qUser)
                .where(qUser.userName.eq(userName).and(qUser.userPhone.eq(userPhone))
                        .and(qUser.userType.eq(Long.valueOf(1)))).fetchOne();
        return Optional.ofNullable(userId);
    }

    public User findUserPw(String userId) {
        User user = jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId).and(qUser.userType.eq(Long.valueOf(1)))).fetchFirst();
        return user;
    }

    @Transactional
    public long changeUserPw(String userId, String userPw) {
        return jpaQueryFactory.update(qUser).where(qUser.userId.eq(userId).and(qUser.userType.eq(Long.valueOf(1))))
                .set(qUser.userPw, userPw).execute();
    }

    public boolean checkId(String userId) {
        return jpaQueryFactory.select(qUser).from(qUser)
                .where(qUser.userId.eq(userId).and(qUser.userType.eq(Long.valueOf(1))))
                .fetchFirst() != null;

    }
}
