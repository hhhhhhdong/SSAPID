package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    public void update(String userId, String boardTitle, String boardContent, LocalDateTime deadLine);
}