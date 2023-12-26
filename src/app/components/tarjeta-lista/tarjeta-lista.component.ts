import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-tarjeta-lista',
  templateUrl: './tarjeta-lista.component.html',
  styleUrls: []
})
export class TarjetaListaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // gsap.from('.gsap-contenido', { y:100, opacity: 0, duration: .2 });
  }

}
