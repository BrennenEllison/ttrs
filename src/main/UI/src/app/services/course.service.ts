import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../common/course';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { 
    let data = JSON.parse(this.storage.getItem("course")!);

    if (data != null){
      this.course = data;
    }
    else {
    }
  }
  
  private url = environment.UI + "/course/search/findById"
  public course!: Course;
  private storage: Storage = sessionStorage;

  private url1 = environment.UI + "/course/names";

  getCourseNames(): Observable<Course[]>{
    return this.httpClient.get<Course[]>(this.url1);
  }

  getCourseInformation(courseId: number): Observable<Course>{
    return this.httpClient.get<Course>(`${this.url}?id=${courseId}`);
  }

  SetCourse(course: Course): void{
    this.course = course;
    this.persistCourse();
  }

  getCourse(): Course {
    return this.course;
  }

  persistCourse(){
    this.storage.setItem("course", JSON.stringify(this.course));
  }
}
