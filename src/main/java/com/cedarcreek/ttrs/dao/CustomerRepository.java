package com.cedarcreek.ttrs.dao;

import com.cedarcreek.ttrs.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String email);

}
