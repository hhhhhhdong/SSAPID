package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Optional<Board> findByBoardSeq(Long boardSeq);

    Page<Board> findAll(Pageable pageable);

    List<Board> findAll();

    Page<Board> findByBoardTitleContaining(String content, Pageable pageable);

    Page<Board> findByBoardContentContaining(String content, Pageable pageable);

    Page<Board> findByBoardContentContainingOrBoardTitleContaining(String content, String cotent2, Pageable pageable);

    Page<Board> findByUser(User user, Pageable pageable);


}