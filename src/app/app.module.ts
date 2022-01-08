import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { NgPluralizeModule } from 'ng-pluralize'
//import { 
  //HighlightModule, 
//  HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    NgPluralizeModule,
    //HighlightModule
  ],
  providers: [
    // {
    //   provide: HIGHLIGHT_OPTIONS,
    //   useValue: {
    //     fullLibraryLoader: () => import('highlight.js/lib/core'),
        
    //   }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
