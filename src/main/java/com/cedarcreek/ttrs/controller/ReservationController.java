package com.cedarcreek.ttrs.controller;

import com.cedarcreek.ttrs.dao.ReservationAddonRepository;
import com.cedarcreek.ttrs.dto.ReservationHistory;
import com.cedarcreek.ttrs.entity.Reservation;
import com.cedarcreek.ttrs.entity.ReservationAddon;
import com.cedarcreek.ttrs.service.ReservationHistoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("api/reservations")
public class ReservationController {

    private final ReservationAddonRepository reservationAddonRepository;
    private ReservationHistoryServiceImpl reservationHistoryService;

    @Autowired
    public ReservationController(ReservationHistoryServiceImpl reservationHistoryService, ReservationAddonRepository reservationAddonRepository){
        this.reservationHistoryService = reservationHistoryService;
        this.reservationAddonRepository = reservationAddonRepository;
    }

    @GetMapping("/history")
    public Set<ReservationHistory> getReservationHistory(@RequestParam String email) {
        return reservationHistoryService.convertData(email);
    }

    @GetMapping("/edit")
    public Reservation getReservation(@RequestParam Long id){
        return reservationHistoryService.fetchReservation(id);
    }

    @DeleteMapping("/edit")
    public Map<String, String> deleteReservation(@RequestParam int id){
        Map<String, String> response = new HashMap<>();
        String deletionResult = reservationHistoryService.removeReservation(id);
        response.put("message", deletionResult);
        return response;
    }

    @PutMapping("/edit")
    public Map<String, String> updateReservationAddons(@RequestBody Reservation reservation){
        Map<String, String> response = new HashMap<>();
        String updateResult = reservationHistoryService.updateReservation(reservation);
        response.put("message", updateResult);
        return response;

    }

}



