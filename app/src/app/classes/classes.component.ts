import { Component, Output, Input, OnInit,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Classe } from './class.model';
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbModal  } from '@ng-bootstrap/ng-bootstrap';
import { ClassesService } from '../shared/services/classes.service';


@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  // icons
  faTrashAlt = faTrashAlt;

  classes:Classe[]
  constructor(
    private classesService: ClassesService,
    private router:Router,
    private _modalService: NgbModal
    ) { }

  ngOnInit(): void {
    this.classesService.getClasses()
        .subscribe(classes => {
          this.classes = classes
        })
  }

  openInfo(classe:Classe) {
    console.log(classe)
    if(classe != null) {
      this.classesService.classeSelected = classe
      this.router.navigate(["/classes", classe.id])
    }
  }

  openModal(classe) {
    //this._modalService.open(content)
    const modal = this._modalService.open(NgbdModalConfirm)
    modal.componentInstance.classe = classe
    modal.componentInstance.deleteEvent.subscribe(i => {
      this.ngOnInit()
    })
  }

}


@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <style>
    .modal-header {
      background-color: #f4f6f6;
    }
    .btn{
      border-radius: 8px !important;
    }
    .btn-danger {
      background-color: #8F221B;
    }
    .btn-danger:hover {
      background-color: #9F221B;
    }

  </style>
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Supprimer une classe</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Êtes-vous sûr de vouloir supprimer la classe <span class="text-primary">{{classe.name}}</span> </strong></p>
    <p>Toutes les informations associées à cette classe seront définitivement supprimées.</p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Annuler</button>
    <button type="button" class="btn btn-danger" (click)="delete()">Supprimer</button>
  </div>
  `
})
export class NgbdModalConfirm {
  @Input() classe:Classe;
  @Output() deleteEvent:EventEmitter<string> = new EventEmitter()


  constructor(
    public modal: NgbActiveModal,
    private classesService: ClassesService) {}
  delete() {
    this.classesService.deleteClasse(this.classe.id).subscribe(message => {
      this.deleteEvent.emit("Deleted")

      this.modal.dismiss("Cross click")
    });
  }
}
