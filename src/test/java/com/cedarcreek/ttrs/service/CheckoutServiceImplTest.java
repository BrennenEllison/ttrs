package com.cedarcreek.ttrs.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.cedarcreek.ttrs.dao.CustomerRepository;
import com.cedarcreek.ttrs.dao.TeeTimeRepository;
import com.cedarcreek.ttrs.dto.Purchase;
import com.cedarcreek.ttrs.dto.PurchaseResponse;
import com.cedarcreek.ttrs.entity.Customer;
import com.cedarcreek.ttrs.entity.Reservation;
import com.cedarcreek.ttrs.entity.ReservationAddon;
import com.cedarcreek.ttrs.entity.TeeTime;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;


class CheckoutServiceImplTest {

    @Mock
    private CustomerRepository customerRepository;

    @Mock
    private TeeTimeRepository teeTimeRepository;

    @InjectMocks
    private CheckoutServiceImpl checkoutService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testReservationAddedAndTeeTimeUpdated(){

        Customer customer = new Customer();
        customer.setEmail("test@test.com");

        Reservation reservation = new Reservation();
        TeeTime teeTime = new TeeTime();
        teeTime.setId(1L);
        teeTime.setBookingStatus(0);

        Purchase purchase = new Purchase();
        purchase.setCustomer(customer);
        purchase.setReservation(reservation);
        purchase.setTeeTime(teeTime);
        purchase.setReservationAddons(Set.of(new ReservationAddon()));

        when(customerRepository.findByEmail("test@example.com")).thenReturn(null);
        when(teeTimeRepository.findById(1L)).thenReturn(Optional.of(teeTime));

        PurchaseResponse response = checkoutService.placeReservation(purchase);

        assertNotNull(response);
        assertEquals("nice", response.getStatus());

        ArgumentCaptor<Customer> customerCaptor = ArgumentCaptor.forClass(Customer.class);
        ArgumentCaptor<TeeTime> teeTimeCaptor = ArgumentCaptor.forClass(TeeTime.class);

        verify(customerRepository).save(customerCaptor.capture());
        verify(teeTimeRepository).save(teeTimeCaptor.capture());

        Customer savedCustomer = customerCaptor.getValue();
        TeeTime updatedTeeTime = teeTimeCaptor.getValue();

        assertNotNull(savedCustomer.getReservations());
        assertTrue(savedCustomer.getReservations().contains(reservation), "Reservation should be added to the customer");

        assertEquals(1, updatedTeeTime.getBookingStatus(), "TeeTime booking status should be updated to 1");
    }
}