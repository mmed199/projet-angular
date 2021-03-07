import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Course } from 'src/app/courses/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient) { }
  uri = 'http://localhost:8010/api/courses';

  addCourseWithFile(formData:FormData):Observable<any> {
    return this.http.post(this.uri, formData)
  }

  getCourses(classe:String = null):Observable<Course[]> {
    let uri = this.uri
    if(classe != null) {
      uri = uri + "?classe=" + classe
    }
    return this.http.get<Course[]>(uri)
  }

  deleteCourse(id:String):Observable<any> {
    console.log(this.uri + "/" + id);
    return this.http.delete(this.uri + "/" + id)
  }

  updateCourse(course:Course):Observable<any> {
    console.log("course befor update :" + course)
    return this.http.put(this.uri, course)
  }
}
