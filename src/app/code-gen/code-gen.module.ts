import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeGenRoutingModule } from './code-gen-routing.module';
import { CodeGenComponent } from './code-gen.component';


@NgModule({
  declarations: [
    CodeGenComponent
  ],
  imports: [
    CommonModule,
    CodeGenRoutingModule
  ]
})
export class CodeGenModule { }
