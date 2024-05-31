import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PartenairePageRoutingModule } from './partenaire-routing.module';

import { PartenairePage } from './partenaire.page';
import {QRCodeModule} from "angularx-qrcode";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PartenairePageRoutingModule,
        QRCodeModule
    ],
  declarations: [PartenairePage]
})
export class PartenairePageModule {}
