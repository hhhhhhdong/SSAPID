package com.ssafy.db.repository;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.db.entity.Board;
import com.ssafy.db.entity.QBoard;
import com.ssafy.db.entity.QUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class BoardRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QBoard qBoard = QBoard.board;
    QUser qUser = QUser.user;

    public Optional<Board> findBoardByBoardSeq(Long boardSeq) {
        Board board = jpaQueryFactory.select(qBoard).from(qBoard).where(qBoard.boardSeq.eq(boardSeq)).fetchOne();

        if (board == null) {
            return Optional.empty();
        }
        return Optional.ofNullable(board);
    }

    public List<Board> findBoardListByWriter(Long userSeq) {
        List<Board> boardList = jpaQueryFactory.selectFrom(qBoard).where(qBoard.user.userSeq.in(
                JPAExpressions.select(qUser.userSeq).from(qUser).where(qUser.userSeq.eq(userSeq)))).fetch();

        return boardList;
    }
}
