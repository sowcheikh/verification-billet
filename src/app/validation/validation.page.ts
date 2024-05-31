import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-validation',
  templateUrl: './validation.page.html',
  styleUrls: ['./validation.page.scss'],
})
export class ValidationPage implements OnInit {
isValide = false;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  retour() {
    this.router.navigate(['/scan-qr']);
  }
}
