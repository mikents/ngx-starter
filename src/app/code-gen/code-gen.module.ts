import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CodeGenRoutingModule } from './code-gen-routing.module';
import { CodeGenComponent } from './code-gen.component';
//import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';
import { TabsModule, TabsetConfig } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CodeGenComponent
  ],
  imports: [
    CommonModule,
    CodeGenRoutingModule,
    FormsModule,
    CodemirrorModule,
    TabsModule
    //HighlightModule
  ],
  providers: [
    TabsetConfig
    // {
    //   provide: HIGHLIGHT_OPTIONS,
    //   useValue: {
    //     fullLibraryLoader: () => import('highlight.js')
    //   }
    // }
  ]
})
export class CodeGenModule { }
