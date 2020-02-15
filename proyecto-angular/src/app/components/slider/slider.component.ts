import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

declare var $:any; //Para poder trabajar con el slider bxSlider

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  /* Recogemos la variable enviada desde el componente padre */
  @Input() anchura: number;
  @Input('etiquetas') captions: boolean; //Otra manera de recibir la variable y cambiar su nombre

  /* Enviando informacion del componente hijo al padre */
  @Output() conseguirAutor = new EventEmitter(); //Para crear un nuevo evento

  public autor: any;

  constructor() { 
    this.autor = {
      nombre: "Practica",
      website: "prueba.com",
      youtube: "Practica"
    };
  }

  ngOnInit() {
    $("#logo").click(function (e) {
      e.preventDefault();//Evitamos que al hacer click se haga la accion por defecto
      $("header").css("background", "green")
        .css("heigth", "50px")
    });

      $('.galeria').bxSlider({
        mode: 'fade',
        captions: this.captions,
        slideWidth: this.anchura
      });
  }

    lanzar(event){
      console.log(event);
      this.conseguirAutor.emit(this.autor); //Pasamos una propiedad o directamente un objeto
    }
}
