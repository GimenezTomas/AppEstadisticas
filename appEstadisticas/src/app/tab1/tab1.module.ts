import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ModalComponent } from '../components/modal/modal.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [Tab1Page,
    ModalComponent
  ]
})
export class Tab1PageModule {}
