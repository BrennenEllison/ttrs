package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dao.ReservationAddonRepository;
import com.cedarcreek.ttrs.dao.ReservationRepository;
import com.cedarcreek.ttrs.dao.TeeTimeRepository;
import com.cedarcreek.ttrs.dto.ReservationHistory;
import com.cedarcreek.ttrs.entity.Reservation;
import com.cedarcreek.ttrs.entity.TeeTime;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
public class ReservationHistoryServiceImpl implements ReservationHistoryService{

    private ReservationRepository reservationRepository;
    private TeeTimeRepository teeTimeRepository;
    private ReservationAddonRepository reservationAddonRepository;

    public ReservationHistoryServiceImpl(ReservationRepository reservationRepository,
                                         TeeTimeRepository teeTimeRepository,
                                         ReservationAddonRepository reservationAddonRepository) {
        this.reservationRepository = reservationRepository;
        this.teeTimeRepository = teeTimeRepository;
        this.reservationAddonRepository = reservationAddonRepository;
    }

    @Override
    public Set<ReservationHistory> convertData(String email) {
        return reservationRepository.findReservationDetailsByEmail(email);
    }

    @Override
    public Reservation fetchReservation(Long id) {
        return reservationRepository.findById(id).get();
    }

    @Override
    public String removeReservation(int id) {
        Reservation reservation = reservationRepository.findById(id);
        TeeTime teeTime = reservation.getTeeTime();

        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime startTime = teeTime.getStartTime();
        startTime = startTime.minusHours(2);
        String message = "Deleted reservation with id " + id;


        if (reservation == null) {
            throw new RuntimeException("Reservation with id " + id + "NOT FOUND");
        }

        reservationRepository.delete(reservation);
        teeTime.setBookingStatus(0);

        teeTimeRepository.save(teeTime);

        return message;
    }

    @Override
    public String updateReservation(Reservation reservation) {
        LocalDateTime currentDateTime = LocalDateTime.now();
        reservationAddonRepository.deleteByReservationId(reservation.getId());
        reservation.setLastUpdated(currentDateTime);
        reservationRepository.save(reservation);

        return "Reservation Updated";
    }
}
