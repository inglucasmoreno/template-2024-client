import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: []
})
export default class HomeComponent implements OnInit {

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.ubicacionActual = 'Dashboard - Inicio'
  }

}
