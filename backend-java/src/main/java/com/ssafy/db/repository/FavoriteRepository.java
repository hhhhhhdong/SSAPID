package com.ssafy.db.repository;

import com.ssafy.db.entity.Favorite;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Favorite findByFavoriteSeq(Long boardSeq);
    List<Favorite> findByUser(User user);
}
