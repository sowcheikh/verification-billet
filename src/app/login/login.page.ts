import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertController, LoadingController} from "@ionic/angular";
import {Router} from "@angular/router";
import {AuthService} from "../core/services/auth.service";
import {USER_CONTROLEUR} from "../core/utils/constant";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    //private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      username: ['test@test.com', [Validators.required]],
      password: ['Ictinfo0+', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    //this.router.navigateByUrl('/scan-qr', {replaceUrl: true});
    const loading = await this.loadingController.create();
     await loading.present();
   this.authService.login(this.credentials.value).subscribe({
      next: async (res) => {
        await loading.dismiss();
        // check role user has CONTROLEUR
        if ( res.account.roles !== null && res.account.roles.includes(USER_CONTROLEUR)) {
          await this.router.navigateByUrl('/scan-qr', {replaceUrl: true});
        } else {
          const alert = await this.alertController.create({
            header: 'Erreur',
            message: 'Vous n\'avez pas les droits pour accéder à cette application',
            buttons: ['OK'],
          });
          await alert.present();
        }

      },
      error: async (res) => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: res.error.message,
          message: res.error.error,
          buttons: ['OK'],
        });
        await alert.present();
      },
    });
  }

  // Getter for easy access to form fields
  get username() {
    return this.credentials.get('username');
  }

  get password() {
    return this.credentials.get('password');
  }

  showHidePassword() {
    console.log('showHidePassword')
    this.showPassword = !this.showPassword;
  }

}
