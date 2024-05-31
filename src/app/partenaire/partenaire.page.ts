import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-partenaire',
  templateUrl: './partenaire.page.html',
  styleUrls: ['./partenaire.page.scss'],
})
export class PartenairePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  valider() {
    this.router.navigate(['/validation']);
  }

  invalide() {
    this.router.navigate(['/invalidation']);
  }
}
