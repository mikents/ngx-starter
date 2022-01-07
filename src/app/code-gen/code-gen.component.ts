import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-code-gen',
  templateUrl: './code-gen.component.html',
  styleUrls: ['./code-gen.component.css']
})
export class CodeGenComponent implements OnInit {

  moduleSingleLower: string = '';
  modulePluralLower: string = '';
  moduleSingleUpper: string = '';
  modulePluralUpper: string = '';
  classSingleLower: string = '';
  classPluralLower: string = '';
  classSingleUpper: string = '';
  classPluralUpper: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
