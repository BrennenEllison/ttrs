package com.cedarcreek.ttrs.dao;


import com.cedarcreek.ttrs.entity.Addon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface AddonRepository extends JpaRepository<Addon, Long> {
}
