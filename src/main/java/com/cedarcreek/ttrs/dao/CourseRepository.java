package com.cedarcreek.ttrs.dao;

import com.cedarcreek.ttrs.dto.CourseNames;
import com.cedarcreek.ttrs.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;


@CrossOrigin(origins="http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "course", path = "course")
public interface CourseRepository extends JpaRepository<Course, Long> {
    Course findById(int id);

    @Query("SELECT new com.cedarcreek.ttrs.dto.CourseNames(c.id, c.courseName) FROM Course c")
    List<CourseNames> findCourseNames();
}
