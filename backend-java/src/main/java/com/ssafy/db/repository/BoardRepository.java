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
    List<Board> findByBoardTitleContaining(String content);
    List<Board> findByBoardContentContaining(String content);
    // IllegalArgumentException - did not match expected type 해결 못해서 QueryDSL 사용해서 만듬
    //List<Board> findByUserContaining(User user);

}