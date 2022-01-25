package com.ssafy.db.repository;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.QBoard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBoard qBoard = QBoard.board;

    public Optional<List<Tuple>> findAllBoard() {
        List<Tuple> boards = jpaQueryFactory.select(qBoard.boardSeq, qBoard.boardTitle, qBoard.createdAt, qBoard.deadline, qBoard.user.userId)
                .fetch();
        if (boards == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(boards);
    }
}
