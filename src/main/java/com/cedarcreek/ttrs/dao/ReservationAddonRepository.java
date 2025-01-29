package com.cedarcreek.ttrs.dao;

import com.cedarcreek.ttrs.entity.ReservationAddon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Repository
public interface ReservationAddonRepository extends JpaRepository<ReservationAddon, Long> {
    Set<ReservationAddon> findByReservationId(long id);

    @Transactional
    void deleteByReservationId(int reservationId);
}
