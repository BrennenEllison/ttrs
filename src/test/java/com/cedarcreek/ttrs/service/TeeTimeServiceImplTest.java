package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dao.CourseRepository;
import com.cedarcreek.ttrs.dao.TeeTimeCategoryRepository;
import com.cedarcreek.ttrs.dao.TeeTimeRepository;
import com.cedarcreek.ttrs.entity.Course;
import com.cedarcreek.ttrs.entity.TeeTime;
import com.cedarcreek.ttrs.entity.TeeTimeCategory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@SpringBootTest
class TeeTimeServiceImplTest {
//
//    @Autowired
//    private TeeTimeService teeTimeService;
//
//    @MockBean
//    private TeeTimeCategoryRepository teeTimeCategoryRepository;
//
//    @MockBean
//    private CourseRepository courseRepository;
//
//    @MockBean
//    private TeeTimeRepository teeTimeRepository;
//
//    @Test
//    void testGenerateTeeTimes() {
//        // Arrange
//        LocalDate beginningDate = LocalDate.of(2025, 1, 1);
//        int dateRange = 2;
//
//        TeeTimeCategory daylightCategory = new TeeTimeCategory();
//        TeeTimeCategory twilightCategory = new TeeTimeCategory();
//
//        daylightCategory.setCategoryName("daylight");
//        daylightCategory.setUnitPrice(45.00);
//
//        twilightCategory.setCategoryName("twilight");
//        twilightCategory.setUnitPrice(35.00);
//
//        when(teeTimeCategoryRepository.findByCategoryName("daylight")).thenReturn(daylightCategory);
//        when(teeTimeCategoryRepository.findByCategoryName("twilight")).thenReturn(twilightCategory);
//
//        Course course = new Course();
//        course.setCourseName("Sample Course");
//        when(courseRepository.findAll()).thenReturn(Collections.singletonList(course));
//
//        // Act
//        teeTimeService.generateFutureTeeTimes();
//
//        // Assert
//        ArgumentCaptor<TeeTime> captor = ArgumentCaptor.forClass(TeeTime.class);
//        verify(teeTimeRepository, atLeastOnce()).save(captor.capture());
//
//        List<TeeTime> savedTeeTimes = captor.getAllValues();
//
//        System.out.println("Generated Tee Times:");
//        savedTeeTimes.forEach(teeTime ->
//                System.out.println("Time: " + teeTime.getStartTime() +
//                        ", Course: " + teeTime.getCourse().getCourseName() +
//                        ", Category: " + teeTime.getTeeTimeCategory().getCategoryName() +
//                        ", Price: $" + teeTime.getUnitPrice())
//        );
//
//        assertThat(savedTeeTimes).isNotEmpty();
//
//        // Check specific properties of the saved tee times
//        for (TeeTime teeTime : savedTeeTimes) {
//            assertThat(teeTime.getCourse()).isEqualTo(course);
//            assertThat(teeTime.getUnitPrice()).isIn(35.00, 45.00); // Twilight and daylight prices
//            assertThat(teeTime.getTeeTimeCategory()).isIn(daylightCategory, twilightCategory);
//            assertThat(teeTime.getStartTime().toLocalTime())
//                    .isNotEqualTo(LocalTime.of(13, 30)) // Break time
//                    .isBefore(LocalTime.of(19, 30));   // Valid end of tee times
//        }
//
//        // Verify repository interactions
//        verify(teeTimeCategoryRepository, atLeastOnce()).findByCategoryName("daylight");
//        verify(teeTimeCategoryRepository, atLeastOnce()).findByCategoryName("twilight");
//        verify(courseRepository, atLeastOnce()).findAll();
//        verify(teeTimeRepository, atLeastOnce()).save(any(TeeTime.class));
//    }
}