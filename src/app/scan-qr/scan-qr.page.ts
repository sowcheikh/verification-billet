import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../core/services/auth.service";
import {MenuController} from "@ionic/angular";
import {USER_KEY} from "../core/utils/constant";
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit, OnDestroy {
  kyabea: string = 'Kya Bea mon amour !';
  currentTime!: string;
  intervalId: any;
  userInfo: any;
  isChild!: string;
  scannedResult: any;
  content_visibility = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuCtrl: MenuController
  ) { }
  // @ts-ignore
  async checkPermission(){
    try {
      const status = await BarcodeScanner.checkPermission({ force: true });
      if (status.granted) {
        console.log('Permission granted');
        return true;
      } else {
        console.log('Permission denied');
        return false;
      }
    } catch (e) {
      console.error(e);
    }
  }
  async startScan() {
    try {
      const permission = await this.checkPermission();
      console.log('Permission', permission)
      if (!permission) {
        return;
      }
      await BarcodeScanner.hideBackground();
      //document.querySelector('body').classList.add('scanner-active');
      this.content_visibility = 'hidden';
      const result = await BarcodeScanner.startScan();
      console.log('Barcode data', result);
      await BarcodeScanner.showBackground();
      //document.querySelector('body').classList.remove('scanner-active');
      this.content_visibility = '';
      if (result.hasContent) {
        this.isChild = result.content;
        this.scannedResult = result.content;
        //this.router.navigate(['/partenaire']);
      }
    }
    catch (e) {
      console.error(e);
      this.stopScan();
    }

  }
   stopScan() {
     BarcodeScanner.showBackground();
     BarcodeScanner.stopScan();
     //document.querySelector('body').classList.remove('scanner-active');
     this.content_visibility = '';

  }


  ngOnInit() {
    this.updateTime();
    this.intervalId = setInterval(() => this.updateTime(), 1000);
    this.userInfo = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.stopScan();
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  scanCode(enfant: string) {
    this.isChild = enfant;
    this.startScan();
  }

  logout() {
    //this.authService.logout();
    this.router.navigate(['/login']);
    // close the menu when you logout
    this.menuCtrl.close();
  }
}
