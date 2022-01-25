package com.ssafy.db.repository;

import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD
import java.util.List;
=======
import java.time.LocalDateTime;
import java.util.Optional;
>>>>>>> 89ed2b6e1ad4d629941ae872d66801c71c183709


@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
<<<<<<< HEAD
    List<Board> findAll();
=======

    Optional<Board> findBoardByBoardSeq(Long boardSeq);
>>>>>>> 89ed2b6e1ad4d629941ae872d66801c71c183709
}