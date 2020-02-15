import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
public widthSlider: number;
public anchuraToSlider: any;
public captions: boolean;
public autor: any;
@ViewChild('textos') textos;

  constructor() { 
    this.captions = true;
  }

  ngOnInit() {
    /* Acceder a las propiedades de los templates */
    /* Opcion 1 */
   /*  var opcion_clasica = document.querySelector('#texto').innerHTML;
    alert(opcion_clasica); */
    /* Opcion 2 */ 
    console.log(this.textos.nativeElement.textContent);
  }

  cargarSlider(){
    //Solventar problema de cargar del slider
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider(){
    this.anchuraToSlider = false;
  }

  getAutor(event){
    console.log(event);
    this.autor = event;
  }

}
