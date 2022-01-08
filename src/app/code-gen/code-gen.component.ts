import { Component, OnInit } from '@angular/core';
import { NgPluralizeService } from 'ng-pluralize';
import { first } from 'rxjs';
import { CodeGenConsts } from './_consts/CodeGenConsts'

const ucap = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";
const lcap = (s: string) => (s && s[0].toLowerCase() + s.slice(1)) || "";

@Component({
  selector: 'app-code-gen',
  templateUrl: './code-gen.component.html',
  styleUrls: ['./code-gen.component.css']
})

export class CodeGenComponent implements OnInit {

  tableDef: any = '';

  openBase_Controller: string = '';
  getAll_Controller: string = '';
  getById_Controller: string = '';
  create_Controller: string = '';
  update_Controller: string = '';
  delete_Controller: string = '';
  closeBase_Controller: string = '';

  code_Controller: string = '';

  moduleSingleLower: string = '';
  modulePluralLower: string = '';
  moduleSingleUpper: string = '';
  modulePluralUpper: string = '';
  classSingleLower: string = '';
  classPluralLower: string = '';
  classSingleUpper: string = '';
  classPluralUpper: string = '';

  incGetAll: boolean = false;
  incGetById: boolean = false;
  incCreate: boolean = false;
  incUpdate: boolean = false;
  incDelete: boolean = false;
  

  constructor(private _plService: NgPluralizeService) { }

  ngOnInit(): void {
    this._plService.addIrregularRule('person', 'persons')
    this._plService.addIrregularRule('people', 'peoples')
    
    setTimeout(() => {
      this.getControllerCode();
      this.getTableDef();
    }, 1000);
  }

  onModuleNameChange(name: string) {

    this.modulePluralLower = this._plService.pluralize(lcap(name));
    this.modulePluralUpper = this._plService.pluralize(ucap(name));
    this.moduleSingleLower = this._plService.singularize(lcap(name));
    this.moduleSingleUpper = this._plService.singularize(ucap(name));
    
    setTimeout(() => {
      this.getControllerCode();
    }, 3000);
    
  }

  onClassNameChange(name: string) {
    //this._plService.addIrregularRule('person', 'persons')
    this.classPluralLower = this._plService.pluralize(lcap(name));
    this.classPluralUpper = this._plService.pluralize(ucap(name));
    this.classSingleLower = this._plService.singularize(lcap(name));
    this.classSingleUpper = this._plService.singularize(ucap(name));

    setTimeout(() => {
      this.getControllerCode();
    }, 3000);
  }

getControllerCode() {

  this.openBase_Controller =
`
using System.Threading.Tasks;
using Dapper.WebApi.Dto;
using Dapper.WebApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace Dapper.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ${this.classSingleUpper}Controller : ControllerBase
    {
        private readonly I${this.classSingleUpper}Repository _${this.classSingleLower}Repository;

        public ${this.classSingleUpper}Controller(I${this.classSingleUpper}Repository ${this.classSingleLower}Repository)
        {
            _${this.classSingleLower}Repository = ${this.classSingleLower}Repository;
        }
`;
this.getAll_Controller = this.incGetAll === false? '':
`
        [HttpGet("Get${this.classPluralUpper}/{userId}")]
        public async Task<ActionResult<${this.classSingleUpper}Dto>> Get${this.classPluralUpper}(long userId)
        {
            var ${this.classPluralLower} = await _${this.classSingleLower}Repository.Get${this.classPluralUpper}(userId);
            return Ok(${this.classPluralLower});
        }
`;
this.getById_Controller = this.incGetById === false? '':
`
        [HttpGet("Get${this.classSingleUpper}ById/{id}/{userId}")]
        public async Task<ActionResult<${this.classSingleUpper}Dto>> Get${this.classSingleUpper}ById(long id, long userId)
        {
            var ${this.classSingleLower} = await _${this.classSingleLower}Repository.Get${this.classSingleUpper}ById(id, userId);
            return Ok(${this.classSingleLower});
        }
`;
this.create_Controller = this.incCreate === false? '':
`
        [HttpPost("Create${this.classSingleUpper}")]
        public async Task<ActionResult> Create${this.classSingleUpper}(${this.classSingleUpper}Dto entity)
        {
            await _${this.classSingleLower}Repository.Create${this.classSingleUpper}(entity);
            return Ok(entity);
        }
`;
this.update_Controller = this.incUpdate === false? '':
`
        [HttpPost("Update${this.classSingleUpper}")]
        public async Task<ActionResult> Update${this.classSingleUpper}(${this.classSingleUpper}Dto entity)
        {
            await _${this.classSingleLower}Repository.Update${this.classSingleUpper}(entity);
            return Ok(entity);
        }
`;
this.delete_Controller = this.incDelete === false? '':
`
        [HttpPost("Delete${this.classSingleUpper}")]
        public async Task<ActionResult> Delete${this.classSingleUpper}(${this.classSingleUpper}Dto entity)
        {
            await _${this.classSingleLower}Repository.Delete${this.classSingleUpper}(entity);
            return Ok();
        }
`;
this.closeBase_Controller =
`        
    }
}`;

this.code_Controller = this.openBase_Controller +
                       this.getAll_Controller +
                       this.getById_Controller +
                       this.create_Controller +
                       this.update_Controller +
                       this.delete_Controller +
                       this.closeBase_Controller
  }

getTableDef() {
  
//this.tableDef = 
let tdef = 
`
USE WCDATA11
GO

IF DB_NAME() <> N'WCDATA11' SET NOEXEC ON
GO

--
-- Create table [dbo].[Phone]
--
PRINT (N'Create table [dbo].[Phone]')
GO
CREATE TABLE dbo.Phone (
  Id bigint IDENTITY (1002000000, 1),
  PhoneNumber varchar(50) NULL,
  Sequence int NULL DEFAULT (0),
  OrganizationUnitId bigint NULL DEFAULT (1),
  CreationTime datetime2 NULL DEFAULT (getdate()),
  CreatorUserId bigint NULL DEFAULT (2),
  LastModificationTime datetime2 NULL,
  LastModifierUserId bigint NULL,
  IsDeleted bit NULL DEFAULT (0),
  DeleterUserId bigint NULL,
  DeletionTime datetime2 NULL,
  x_LegacyId int NULL,
  x_LegacyType varchar(50) NULL,
  CONSTRAINT PK_Phone_Id PRIMARY KEY CLUSTERED (Id)
)
ON [PRIMARY]
GO
`;

let start = tdef.indexOf('CREATE');
let end = tdef.lastIndexOf(')');

tdef = tdef.slice(start,end);

let s1 = tdef.indexOf('(')+2;
let e1 = tdef.lastIndexOf('CONSTRAINT');
tdef = tdef.slice(s1,e1);

//let rowcount = tdef.match('\n');
let rowcount = (tdef.match(/\n/g) || []).length;
//console.log(rowcount);

let rowstart = 0;
let rowend = 0;
let ary = Array();
let rowstring;
let firstspace;
let secondspace;
let fieldname;
let datatype;

let arr = new Array();
let obj = new Object();


//obj["01"] = arr.fieldName;
//obj["02"] = nieto.value;
//nietos.push(obj);

for (let index = 0; index < rowcount; index++) {
  rowstart = index === 0? rowstart: rowend + 1;
  rowend = tdef.indexOf('\n',rowstart);
  //tdef = tdef.slice(rowstart,rowend);
  console.log(rowstart);
  console.log(rowend);
  rowstring = tdef.slice(rowstart,rowend).trim().replace(',','');
  firstspace = rowstring.indexOf(' ');
  secondspace = rowstring.indexOf(' ', firstspace+1);
  rowstring = rowstring.slice(0,secondspace);
  firstspace = rowstring.indexOf(' ');
  
  obj[index] = rowstring.slice(0,firstspace)

  fieldname = "'fieldName': '" + rowstring.slice(0,firstspace) + "',";
  datatype = "'dataType': '" + rowstring.slice(firstspace,rowstring.length) + "'";
  ary.push(rowstring);
  //console.log(index);
  
}
console.log(ary);
//console.log(crlfcount);
//let e2 = tdef.indexOf('\n');
//tdef = tdef.slice(0,e2);

this.tableDef = tdef;

//console.log(start);
//console.log(end);
//console.log(tdef.slice(start,end));
}
}
