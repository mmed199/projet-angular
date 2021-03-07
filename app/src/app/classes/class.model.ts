import { Etudiant } from "./etudiant.model";

export class Classe {
  _id?:string;
  id:string;
  name:string;
  promo:string;
  etudiants:Etudiant[]
}
