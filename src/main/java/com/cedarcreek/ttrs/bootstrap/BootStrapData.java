package com.cedarcreek.ttrs.bootstrap;

import com.cedarcreek.ttrs.dao.TeeTimeRepository;
import com.cedarcreek.ttrs.service.TeeTimeServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;


@Component
public class BootStrapData implements CommandLineRunner {
    private TeeTimeServiceImpl teeTimeService;
    private TeeTimeRepository teeTimeRepository;

    @Autowired
    public BootStrapData(TeeTimeServiceImpl teeTimeService, TeeTimeRepository teeTimeRepository) {
        this.teeTimeService = teeTimeService;
        this.teeTimeRepository = teeTimeRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        if (teeTimeRepository.findAll().isEmpty()) {
            teeTimeService.generateWeeklyTeeTimes();
        }
    }
}
