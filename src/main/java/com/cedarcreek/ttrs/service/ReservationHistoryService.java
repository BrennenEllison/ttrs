package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dto.ReservationHistory;
import com.cedarcreek.ttrs.entity.Reservation;

import java.util.Set;

public interface ReservationHistoryService {
    Set<ReservationHistory> convertData(String email);
    Reservation fetchReservation(Long id);
    String removeReservation(int id);
    String updateReservation(Reservation reservation);

}
