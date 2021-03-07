import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/classes/class.model';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { Course } from '../course.model';


@Component({
  selector: 'app-add-courses',
  templateUrl: './add-courses.component.html',
  styleUrls: ['./add-courses.component.css']
})
export class AddCoursesComponent implements OnInit {

  newClasse:boolean = false;
  classe:Classe;
  course:Course = new Course()
  coursesAded:Course[] = [];

  uploadedFiles:any = null
  constructor(private http: HttpClient,
    private classesService: ClassesService,
    private coursesService: CoursesService,
    private route: ActivatedRoute) { }



  ngOnInit(): void {
    const id:String = this.route.snapshot.params.id

    this.route.queryParams.subscribe(params => {
      if(params['new'] == "true") {
        this.newClasse = true
      }
    })

    this.classesService.getClasse(id).subscribe(
      res => this.classe = res
    )
    this.coursesService.getCourses(id).subscribe(courses => {
      this.coursesAded = courses
    })
  }

  fileChange(element) {
    this.uploadedFiles = element.target.files;
  }

  upload() {
    let formData = new FormData();
    let random = Math.floor(Math.random() * Math.floor(1000))
    let newFileName = this.classe.id + "_" + this.course.name.replace(/\s/g, "_") + "_" + random +"." + this.uploadedFiles[0].name.split('.').pop()
    this.course.avatar = newFileName
    this.course.classe = this.classe.id
    formData.append("avatar", this.uploadedFiles[0], newFileName)
    formData.append("course", JSON.stringify(this.course))

    this.coursesService.addCourseWithFile(formData).subscribe(res => {
      if(!res.error) {
        console.log(res.course)
        this.coursesAded.push(res.course)
        this.course = new Course()
      }
    })
  }

  delete(course:Course) {
    this.coursesService.deleteCourse(course._id).subscribe(res => {
      if(res.ok == 1) {
        const index = this.coursesAded.indexOf(course, 0);
        if (index > -1) {
          this.coursesAded.splice(index, 1);
        }
      }
    })
  }
}
