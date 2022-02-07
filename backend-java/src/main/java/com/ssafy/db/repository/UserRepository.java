package com.ssafy.db.repository;

import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserNickname(String userNickname);
    User findByUserNickname(String userNickname);
    User findByUserNameAndUserPhone(String userName, String userPhone);
}