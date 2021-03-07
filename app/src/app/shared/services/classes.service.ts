import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Classe } from '../../classes/class.model';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {

  constructor(private http: HttpClient) { }

  public classeSelected:Classe = null;

  uri = 'http://localhost:8010/api/classes';

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.uri)
      .pipe(
        catchError(this.handleError<any>("getClasses"))
      )
  }

  getClasse(id:String):Observable<Classe> {
    return this.http.get(this.uri + '/' + id).pipe(
      catchError(this.handleError<any>("getClasse"))
    )
  }

  addClasse(classe:Classe):Observable<any> {
    console.log("AJOUTER : " + classe)
    return this.http.post(this.uri, classe)
  }

  deleteClasse(id:String):Observable<any> {
    return this.http.delete(this.uri + '/' + id).pipe(
      catchError(this.handleError<any>("deleteClasse"))
    )
  }

  private handleError<T>(operation:any, result?:T) {
    return(error:any) : Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + " a échoué " + error.message);

      return of(result as T);
    }
  }

}
