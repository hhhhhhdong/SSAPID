package com.ssafy.schedule;

import com.ssafy.db.repository.BoardRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StopWatch;

import java.time.LocalDate;

@Component
public class scheduler {
    @Autowired
    BoardRepositorySupport boardRepositorySupport;

    @Scheduled(cron = " 0 0 0 * * *",zone = "Asia/Seoul") // cron식 표기 0초 0분 0시 매일 실행
    @Transactional
    public void scheduleUpdateBoardStatus() {
        StopWatch stopWatch = new StopWatch();
        stopWatch.start();

        System.out.println(LocalDate.now());
        boardRepositorySupport.updateBoardStatus();

        stopWatch.stop();

        System.out.println("deadline update :" + stopWatch.getTotalTimeSeconds());
    }
}
