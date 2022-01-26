package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    List<Board> findAll();
    List<Board> findByBoardTitleContaining(String content);
    List<Board> findByBoardContentContaining(String content);
    List<Board> findByUserContaining(User user);
    Optional<Board> findBoardByBoardSeq(Long boardSeq);
}