package com.cedarcreek.ttrs.dao;

import com.cedarcreek.ttrs.dto.ReservationHistory;
import com.cedarcreek.ttrs.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

@Query("SELECT new com.cedarcreek.ttrs.dto.ReservationHistory(t.startTime, t.holeCount, c.courseName, r.totalPrice, r.status, r.id) " +
        "FROM Customer cc " +
        "INNER JOIN cc.reservations r " +
        "INNER JOIN r.teeTime t " +
        "INNER JOIN t.course c " +
        "WHERE cc.email = :email")
Set<ReservationHistory> findReservationDetailsByEmail(@Param("email") String email);

Reservation findById(long id);

}