package com.ssafy.db.repository;

import com.ssafy.db.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;


public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
    Favorite findByFavoriteSeq(Long boardSeq);
}
