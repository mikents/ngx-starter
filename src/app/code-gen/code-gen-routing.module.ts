import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodeGenComponent } from './code-gen.component';

const routes: Routes = [{ path: '', component: CodeGenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeGenRoutingModule { }
