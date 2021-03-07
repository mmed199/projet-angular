import { Assignement } from "./assignement.model";

export class Course {
  _id?:string;
  name:String;
  classe:String;
  professeur:String;
  semestre:String;
  avatar:String;
  assignments: Assignement[];
}
