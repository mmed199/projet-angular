import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Classe } from '../class.model';
import { faGraduationCap, faChevronRight, faPlus, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { Course } from 'src/app/courses/course.model';
import { CoursesService } from 'src/app/shared/services/courses.service';
import { Assignement } from 'src/app/courses/assignement.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-info-classe',
  templateUrl: './info-classe.component.html',
  styleUrls: ['./info-classe.component.css']
})
export class InfoClasseComponent implements OnInit {
  // FONT AWESOME ICONS
  faGraduationCap = faGraduationCap
  faChevronRight = faChevronRight
  faPlus = faPlus
  faCalendar = faCalendarAlt

  notePassed:number = 0
  currentDate = new Date();
  courses:Course[]
  classe:Classe
  selectedCourse:Course;
  assignement:Assignement = new Assignement()

  indexSelectedAssignement:Number = 0;


  constructor(
    private classesService: ClassesService,
    private coursesService: CoursesService,
    private route: ActivatedRoute,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    const id:String = this.route.snapshot.params.id

    if(this.classesService.classeSelected != null && this.classesService.classeSelected.id == id) {
      this.classe = this.classesService.classeSelected
      this.getCourses()
    } else {
      this.classesService.getClasse(id).subscribe(classe => {
        this.classe = classe
        this.getCourses()
      })
    }
  }

  getCourses():void {
    this.coursesService.getCourses(this.classe.id).subscribe(courses => {
      this.courses = courses;
      if(courses.length > 0) {
        this.selectedCourse = courses[0]
        if(this.selectedCourse.assignments != null && this.selectedCourse.assignments.length > 0)
          this.indexSelectedAssignement = 0
      }

    })
  }

  selectCourse(course:Course) {
    this.selectedCourse = course
  }

  selectAssignment(index) {
    this.indexSelectedAssignement = index
  }

  deleteAssignment(index) {
    this.selectedCourse.assignments.splice(index, 1)
    console.log(this.selectedCourse.assignments)
    this.updateCourse()
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      console.log(result)
      if(result == "Save") {
        this.saveAssignement()
      }
    }, (reason) => {
      console.log(reason)
    });
  }

  saveAssignement() {
    if(this.selectedCourse.assignments == null) {
      this.selectedCourse.assignments = []
    }


    this.assignement.etudiants = this.classe.etudiants
    if(this.assignement._id) {
      this.selectedCourse.assignments.forEach((e,i) => {
        if(e._id == this.assignement._id) {
          this.selectedCourse.assignments[i] = this.assignement
        }
      })
    } else {
      this.selectedCourse.assignments.push(this.assignement)
    }

    this.updateCourse()
    this.assignement = new Assignement()
  }

  updateCourse() {
    this.coursesService.updateCourse(this.selectedCourse).subscribe(res => {
      if(res.error == false) {
        this.selectedCourse = res.course
        this.courses.forEach((e, i) => {
          if(e._id == this.selectedCourse._id) {
           this.courses[i] = this.selectedCourse
          }
        })
      }
    })
  }

  betweenDates(date1:Date, date2:Date = this.currentDate) {
    date1 = new Date(date1.toString())
    return Math.round((date1.getTime()-date2.getTime())/(1000*60*60*24));
  }

  assignementsExist() {
    if(this.selectedCourse == null || this.selectedCourse.assignments ==  null || this.selectedCourse.assignments.length == 0) {
      return false
    } else {
      return true
    }
  }

  rendu(index, indexA, value, modal) {
    if(value == true) {
      this.modalService.open(modal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        if(result == "Save") {
          this.selectedCourse.assignments[indexA].etudiants[index].rendu = value
          this.selectedCourse.assignments[indexA].etudiants[index].note = this.notePassed
          this.notePassed = 0
          this.updateCourse()
        }
      })
    } else {
      this.selectedCourse.assignments[indexA].etudiants[index].rendu = value
      this.updateCourse()
    }
  }
}


