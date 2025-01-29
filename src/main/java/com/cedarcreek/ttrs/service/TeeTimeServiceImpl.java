package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dao.CourseRepository;
import com.cedarcreek.ttrs.dao.TeeTimeCategoryRepository;
import com.cedarcreek.ttrs.dao.TeeTimeRepository;
import com.cedarcreek.ttrs.entity.Course;
import com.cedarcreek.ttrs.entity.TeeTime;
import com.cedarcreek.ttrs.entity.TeeTimeCategory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class TeeTimeServiceImpl implements TeeTimeService {

    private TeeTimeRepository teeTimeRepository;
    private TeeTimeCategoryRepository teeTimeCategoryRepository;
    private CourseRepository courseRepository;

    public TeeTimeServiceImpl(TeeTimeRepository teeTimeRepository,
                              TeeTimeCategoryRepository teeTimeCategoryRepository,
                                CourseRepository courseRepository) {

        this.teeTimeRepository = teeTimeRepository;
        this.teeTimeCategoryRepository = teeTimeCategoryRepository;
        this.courseRepository = courseRepository;
    }
    @Override
    @Scheduled(cron = "0 30 21 * * *")
    public void generateFutureTeeTimes() {
        LocalDate date = LocalDate.now().plusDays(15);
        int dateRange = 1;
        generateTeeTimes(date, dateRange);
    }

    @Override
    public void generateWeeklyTeeTimes() {
        LocalDate date = LocalDate.now();
        int dateRange = 15;
        generateTeeTimes(date, dateRange);
    }

    public void generateTeeTimes(LocalDate beginningDate, int dateRange) {
        LocalDate date = beginningDate;
        LocalTime sevenAM = LocalTime.of(7, 0);

        LocalDateTime startDate = LocalDateTime.of(date, sevenAM);
        LocalDateTime endDate = startDate.plusDays(dateRange);

        LocalTime break1 = LocalTime.of(13, 30, 0);
        LocalTime break2 = LocalTime.of(19, 30, 0);

        LocalTime daylight = LocalTime.of(14, 0, 0);
        LocalTime twilight = LocalTime.of(17, 0, 0);

        TeeTimeCategory twilightCategory = teeTimeCategoryRepository.findByCategoryName("twilight");
        TeeTimeCategory daylightCategory = teeTimeCategoryRepository.findByCategoryName("daylight");

        List<Course> courseList = courseRepository.findAll();

        LocalDateTime currentDate = startDate;

        while (currentDate.isBefore(endDate)) {
            LocalTime currentTime = currentDate.toLocalTime();
            while (currentTime.isBefore(break2)) {
                LocalDateTime startTime = currentDate.with(currentTime);
                currentTime = currentTime.plusMinutes(20);
                if (currentTime.isBefore(daylight)) {
                    saveTeeTime(startTime, courseList, daylightCategory);
                } else if (currentTime.isAfter(twilight)) {
                    saveTeeTime(startTime, courseList, twilightCategory);
                }

                if (currentTime.equals(break1)) {
                    currentTime = currentTime.plusHours(2);
                }
            }
            currentDate = currentDate.plusDays(1);

        }
    }


    public void saveTeeTime(LocalDateTime startTime, List<Course> courseList, TeeTimeCategory teeTimeCategory){
        double price = 45.00;
        for (Course course : courseList){
            if (teeTimeCategory.getCategoryName().equals("twilight")){
                price = 35.00;
            }
            TeeTime teeTime = new TeeTime(startTime, 18, 0, price, course, teeTimeCategory);
            teeTimeRepository.save(teeTime);
        }
    }

}
