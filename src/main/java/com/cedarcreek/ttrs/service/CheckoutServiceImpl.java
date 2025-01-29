package com.cedarcreek.ttrs.service;

import com.cedarcreek.ttrs.dao.CustomerRepository;
import com.cedarcreek.ttrs.dao.TeeTimeRepository;
import com.cedarcreek.ttrs.dto.Purchase;
import com.cedarcreek.ttrs.dto.PurchaseResponse;
import com.cedarcreek.ttrs.entity.Customer;
import com.cedarcreek.ttrs.entity.Reservation;
import com.cedarcreek.ttrs.entity.ReservationAddon;
import com.cedarcreek.ttrs.entity.TeeTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private CustomerRepository customerRepository;
    private TeeTimeRepository teeTimeRepository;

    @Autowired
    public CheckoutServiceImpl(CustomerRepository customerRepository, TeeTimeRepository teeTimeRepository) {
        this.customerRepository = customerRepository;
        this.teeTimeRepository = teeTimeRepository;
    }

    @Override
    public PurchaseResponse placeReservation(Purchase purchase) {

        Reservation reservation = purchase.getReservation();

        Set<ReservationAddon> reservationAddons = purchase.getReservationAddons();
        reservationAddons.forEach(item -> reservation.addAddon(item));

        TeeTime teeTime = purchase.getTeeTime();

        reservation.setTeeTime(teeTime);

        Customer customer = purchase.getCustomer();

        String email = customer.getEmail();
        Customer customerFromDB = customerRepository.findByEmail(email);
        if (customerFromDB != null) {
            customer = customerFromDB;
        }

        customer.addReservation(reservation);
        customerRepository.save(customer);

        Optional<TeeTime> optionalTeeTime = teeTimeRepository.findById(teeTime.getId());
        TeeTime reserved = optionalTeeTime.get();

        reserved.setBookingStatus(1);
        teeTimeRepository.save(reserved);


        return new PurchaseResponse("nice");
    }
}
