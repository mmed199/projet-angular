import { Component, OnInit } from '@angular/core';
import { Classe } from '../class.model';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { ClassesService } from 'src/app/shared/services/classes.service';
import { Router } from '@angular/router';
import { Etudiant } from '../etudiant.model';


@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.css']
})
export class AddClasseComponent implements OnInit {
  // form
  classe:Classe = new Classe()
  fileEtudiants: any = null
  alert = {
    type : "success",
    message : "",
    show : false
  }

  constructor(
    private ngxCsvParser: NgxCsvParser,
    private classesService: ClassesService,
    private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.validate()) {
      this.classe.promo = this.classe.promo.substring(0,4) + "/" + this.classe.promo.substring(4,8)
      this.classe.id = this.classe.name.replace(/\s/g, '').toLowerCase() + "_" + this.classe.promo.replace(/\//g,"_")

      this.classesService.getClasse(this.classe.id).subscribe(classe => {
        if(classe != null) {
          this.alert.type = "danger"
          this.alert.message = "Une Promo ("+ this.classe.promo +") de cette formation existe déja "
          this.alert.show = true
        } else {
          this.classesService.addClasse(this.classe).subscribe(message => {
            if(message.error) {
              this.alert.type = "danger"
              this.alert.message = "Cette classe existe déja, essayez une autre promo"
              this.alert.show = true
            } else {
              this.classesService.classeSelected = this.classe
              this.router.navigate(["/courses", this.classe.id], { queryParams: { new: true }});
            }

          })
        }

      })

    } else {
      return
    }
  }

  validate() {
    if(this.classe.name == null || this.classe.name == "" || !this.classe.name.replace(/\s/g, '').length) {
      this.alert.type = "danger"
      this.alert.message = "Merci de remplir le libellé de la classe"
      this.alert.show = true
      return false
    }
    return true;
  }

  onFileDropped($event) {
    console.log("onFileDropped")
    this.prepareFilesList($event);
  }

  fileBrowseHandler(fileE) {
    console.log("fileBrowseHandler")
    this.prepareFilesList(fileE[0]);
  }

  deleteFile() {
    console.log("deleteFile")
    this.fileEtudiants = null;
    this.alert.message = ""
    this.alert.show = false
  }

  prepareFilesList(fileE: any) {
    this.fileEtudiants = fileE;
    this.alert.show = true;
    this.ngxCsvParser.parse(this.fileEtudiants, { header: true, delimiter: ',' })
      .pipe().subscribe((result: Array<Etudiant>) => {
        console.log(result)
        this.classe.etudiants = result;
        if(this.classe.etudiants.length > 0) {
          this.alert.type = "success"
          this.alert.message = this.classe.etudiants.length + " etudiants ajouté avec succes"
        } else {
          this.alert.type = "danger"
          this.alert.message = "Aucun etudiant trouvé dans le fichier"
        }

      }, (error: NgxCSVParserError) => {
        this.alert.type = "danger"
        this.alert.message = "Aucun etudiant trouvé dans le fichier"
        console.log('Error', error);
      });
  }
}
