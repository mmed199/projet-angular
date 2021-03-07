import { Etudiant } from "../classes/etudiant.model";

export class Assignement {
  _id?:string;
  dateDeRendu: Date;
  nom: String;
  typeA:String;
  etudiants:Etudiant[];
}


