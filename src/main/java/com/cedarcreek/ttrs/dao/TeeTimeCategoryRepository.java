package com.cedarcreek.ttrs.dao;

import com.cedarcreek.ttrs.entity.TeeTimeCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "teeTimeCategory", path= "tee-time-category")
public interface TeeTimeCategoryRepository extends JpaRepository<TeeTimeCategory, Long> {
    TeeTimeCategory findByCategoryName(String name);
}
