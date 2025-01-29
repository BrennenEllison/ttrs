package com.cedarcreek.ttrs.dao;

import com.cedarcreek.ttrs.entity.TeeTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@RepositoryRestResource(collectionResourceRel = "teeTime", path= "tee-time")
public interface TeeTimeRepository extends JpaRepository<TeeTime, Long> {

    @Query("select t from TeeTime t where t.course.id =:id and t.bookingStatus =:status and t.startTime between :startTime and :endTime")
    Page<TeeTime> findByDate(@Param("id") Long id,
                             @Param("status") int bookingStatus,
                             @Param("startTime") LocalDateTime startTime,
                             @Param("endTime") LocalDateTime endTime,
                             Pageable pageable);

}
