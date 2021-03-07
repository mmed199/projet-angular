import { Injectable } from '@angular/core';
import { Assignment } from '../../assignments/assignment.model';
import { Observable, of } from 'rxjs';
import { LoggingService } from './logging.service';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: Assignment[] = [
    {
      id: 1,
      nom: 'TP1 Web Components à rendre',
      dateDeRendu: new Date('2020-11-17'),
      rendu: true,
    },
    {
      id: 2,
      nom: 'TP2 Angular à rendre',
      dateDeRendu: new Date('2020-12-13'),
      rendu: false,
    },
    {
      id: 3,
      nom: 'Mini Projet Angular à rendre',
      dateDeRendu: new Date('2021-01-07'),
      rendu: false,
    },
  ];

  constructor(
    private loggingService: LoggingService,
    private http: HttpClient
  ) {}

  uri = 'http://localhost:8010/api/assignments';

  getAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri)
      .pipe(
        catchError(this.handleError<any>("getAssignments"))
      )
  }

  getAssignment(id: number): Observable<Assignment> {
    return this.http.get<Assignment>(this.uri + '/' + id)
    .pipe(
      map(a => {
        return a;
      }),
      tap(a => {

        return a
      }),
      catchError(this.handleError<Assignment>(`getAssignment(id=${id})`))
    );
  }

  addAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'ajouté');
    return this.http.post(this.uri, assignment);
  }

  updateAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'modifié');
    return this.http.put<Assignment>(this.uri, assignment);
  }

  deleteAssignment(assignment: Assignment): Observable<any> {
    this.loggingService.log(assignment, 'supprimé');
    return this.http.delete(this.uri + '/' + assignment._id);
  }

  private handleError<T>(operation:any, result?:T) {
    return(error:any) : Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    }
  }
}
