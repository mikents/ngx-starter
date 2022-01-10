import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgPluralizeService } from 'ng-pluralize';
import { DbData } from './_models/db-data.model';

const ucap = (s: string) => (s && s[0].toUpperCase() + s.slice(1)) || "";
const lcap = (s: string) => (s && s[0].toLowerCase() + s.slice(1)) || "";

@Component({
  selector: 'app-code-gen',
  templateUrl: './code-gen.component.html',
  styleUrls: ['./code-gen.component.css']
})

export class CodeGenComponent implements OnInit {

  selectedTab = 1;

  tableDef: any = '';
  loadTable: any = '';
  tableFields: DbData[] = [];

  selectedModuleName: string = '';
  selectedClassName: string = '';

  openBase_Controller: string = '';
  getAll_Controller: string = '';
  getById_Controller: string = '';
  create_Controller: string = '';
  update_Controller: string = '';
  delete_Controller: string = '';
  closeBase_Controller: string = '';
  
  openBase_Dto: string = '';
  closeBase_Dto: string = '';
  
  openBase_CommandTextInterface: string = '';
  getAll_CommandTextInterface: string = '';
  getById_CommandTextInterface: string = '';
  create_CommandTextInterface: string = '';
  update_CommandTextInterface: string = '';
  delete_CommandTextInterface: string = '';
  closeBase_CommandTextInterface: string = '';
  
  openBase_CommandText: string = '';
  getAll_CommandText: string = '';
  getById_CommandText: string = '';
  create_CommandText: string = '';
  update_CommandText: string = '';
  delete_CommandText: string = '';
  closeBase_CommandText: string = '';
  
  openBase_RepositoryInterface: string = '';
  getAll_RepositoryInterface: string = '';
  getById_RepositoryInterface: string = '';
  create_RepositoryInterface: string = '';
  update_RepositoryInterface: string = '';
  delete_RepositoryInterface: string = '';
  closeBase_RepositoryInterface: string = '';
  
  openBase_Repository: string = '';
  getAll_Repository: string = '';
  getById_Repository: string = '';
  create_Repository: string = '';
  update_Repository: string = '';
  delete_Repository: string = '';
  closeBase_Repository: string = '';


  code_Controller: string = 'CONTROLLER CODE WILL GENERATE HERE';
  code_Dto: string = 'DTO CODE WILL GENERATE HERE';
  code_CommandText: string = 'COMMAND TEXT CODE WILL GENERATE HERE';
  code_CommandTextInterface: string = 'COMMAND TEXT INTERFACE CODE WILL GENERATE HERE';
  code_Repository: string = 'REPOSITORY CODE WILL GENERATE HERE';
  code_RepositoryInterface: string = 'REPOSITORY INTERFACE CODE WILL GENERATE HERE';

  moduleSingleLower: string = '';
  modulePluralLower: string = '';
  moduleSingleUpper: string = '';
  modulePluralUpper: string = '';
  classSingleLower: string = '';
  classPluralLower: string = '';
  classSingleUpper: string = '';
  classPluralUpper: string = '';

  incGetAll: boolean = true;
  incGetById: boolean = true;
  incCreate: boolean = true;
  incUpdate: boolean = true;
  incDelete: boolean = true;

  codeControllerCopyText = 'Copy';
  codeDtoCopyText = 'Copy';
  codeCommandTextInterfaceCopyText = 'Copy';
  codeCommandTextCopyText = 'Copy';
  codeRepositoryInterfaceCopyText = 'Copy';
  codeRepositoryCopyText = 'Copy';

  constructor(private _plService: NgPluralizeService) { }

  ngOnInit(): void {
    this._plService.addIrregularRule('person', 'persons');
    this._plService.addIrregularRule('people', 'peoples');
    
    this._plService.addIrregularRule('bigint','long');
    this._plService.addIrregularRule('binary','byte[]');
    this._plService.addIrregularRule('bit','bool');
    this._plService.addIrregularRule('char','string');
    this._plService.addIrregularRule('date','DateTime');
    this._plService.addIrregularRule('datetime','DateTime');
    this._plService.addIrregularRule('datetime2','DateTime');
    this._plService.addIrregularRule('datetimeoffset','DateTimeOffset');
    this._plService.addIrregularRule('decimal','decimal');
    this._plService.addIrregularRule('filestream','byte[]');
    this._plService.addIrregularRule('float','double');
    this._plService.addIrregularRule('geography','Microsoft.SqlServer.Types.SqlGeography');
    this._plService.addIrregularRule('geometry','Microsoft.SqlServer.Types.SqlGeometry');
    this._plService.addIrregularRule('hierarchyid','Microsoft.SqlServer.Types.SqlHierarchyId');
    this._plService.addIrregularRule('image','byte[]');
    this._plService.addIrregularRule('int','int');
    this._plService.addIrregularRule('money','decimal');
    this._plService.addIrregularRule('nchar','string');
    this._plService.addIrregularRule('ntext','string');
    this._plService.addIrregularRule('numeric','decimal');
    this._plService.addIrregularRule('nvarchar','string');
    this._plService.addIrregularRule('real','Single');
    this._plService.addIrregularRule('rowversion','byte[]');
    this._plService.addIrregularRule('smalldatetime','DateTime');
    this._plService.addIrregularRule('smallint','short');
    this._plService.addIrregularRule('smallmoney','decimal');
    this._plService.addIrregularRule('sql_variant','object');
    this._plService.addIrregularRule('text','string');
    this._plService.addIrregularRule('time','TimeSpan');
    this._plService.addIrregularRule('timestamp','byte[]');
    this._plService.addIrregularRule('tinyint','byte');
    this._plService.addIrregularRule('uniqueidentifier','Guid');
    this._plService.addIrregularRule('varbinary','byte[]');
    this._plService.addIrregularRule('varchar','string');
    this._plService.addIrregularRule('xml','string');
    
    //setTimeout(() => {
      //this.getControllerCode();
      //this.getDtoCode();
      //this.getTableDef();
    //}, 1000);
  }

  selectTab(n: number) {
    this.selectedTab = n;
  }

  getTableDef() {
    if (this.loadTable) {
      let tableName = '';

      let tdef = this.loadTable;

      tableName = tdef.slice(tdef.indexOf('CREATE TABLE ') + 13, tdef.indexOf('(', tdef.indexOf('CREATE TABLE ')));
      tableName = tableName.slice(tableName.indexOf('.') + 1, tableName.length);

      this.selectedClassName = tableName.trim();

      let start = tdef.indexOf('CREATE');
      let end = tdef.lastIndexOf(')');

      tdef = tdef.slice(start, end);

      let s1 = tdef.indexOf('(') + 2;
      let e1 = tdef.lastIndexOf(',');
      tdef = tdef.slice(s1, e1 + 2);

      let rowcount = (tdef.match(/\n/g) || []).length;
      let rowstart = 0;
      let rowend = 0;
      let rowstring;
      let firstspace;
      let secondspace;
      let fieldname;
      let datatype;
      let arr = new Array();
      let parsedTable = 'FieldName'.padEnd(30, " ") + '' + 'DataType \n';

      for (let index = 0; index < rowcount; index++) {
        rowstart = index === 0 ? rowstart : rowend + 1;
        rowend = tdef.indexOf('\n', rowstart);

        rowstring = tdef.slice(rowstart, rowend).trim().replace(',', '');

        firstspace = rowstring.indexOf(' ');
        secondspace = rowstring.indexOf(' ', firstspace + 1);

        fieldname = rowstring.slice(0, firstspace);
        datatype = rowstring.slice(firstspace + 1, secondspace);

        parsedTable = parsedTable + fieldname.padEnd(30, ".") + '' + datatype + ' \n';

        arr.push({ fieldName: fieldname, dataType: datatype });
      }
      this.tableFields = arr;
      this.tableDef = parsedTable; //tdef;
      console.log(this.tableFields);
      this.onClassNameChange(this.selectedClassName);
    }

  }

  onModuleNameChange(name: string) {

    this.modulePluralLower = this._plService.pluralize(lcap(name));
    this.modulePluralUpper = this._plService.pluralize(ucap(name));
    this.moduleSingleLower = this._plService.singularize(lcap(name));
    this.moduleSingleUpper = this._plService.singularize(ucap(name));
    
    setTimeout(() => {
      this.getControllerCode();
      this.getDtoCode();
      this.getCommandTextInterfaceCode();
      this.getCommandTextCode();
      this.getRepositoryInterfaceCode();
      this.getRepositoryCode();
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
      this.getDtoCode();
      this.getCommandTextInterfaceCode();
      this.getCommandTextCode();
      this.getRepositoryInterfaceCode();
      this.getRepositoryCode();
    }, 3000);
  }

getAllCode() {
  this.getControllerCode();
  this.getDtoCode();
  this.getCommandTextInterfaceCode();
  this.getCommandTextCode();
  this.getRepositoryInterfaceCode();
  this.getRepositoryCode();
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
  };

  
getDtoCode() {
    let fieldList = '';
    this.tableFields.forEach((element: DbData) => {
      let parsedDataType = element?.dataType?.replace(/ *\([^)]*\) */g, "")
      fieldList = fieldList + 'public ' + this._plService.pluralize(parsedDataType) + ' ' + element.fieldName + ' { get; set; }\n        ';
    });

    this.openBase_Dto =
  `
namespace Dapper.WebApi.Dto
{
    public class ${this.classSingleUpper}Dto
    {
        ${fieldList}
    }
}
`;
  
  this.code_Dto = this.openBase_Dto;

}

getCommandTextInterfaceCode() {
    // let fieldList = '';
    // this.tableFields.forEach((element: DbData) => {
    //   let parsedDataType = element?.dataType?.replace(/ *\([^)]*\) */g, "")
    //   fieldList = fieldList + 'public ' + this._plService.pluralize(parsedDataType) + ' ' + element.fieldName + ' { get; set; }\n        ';
    // });

    this.openBase_CommandTextInterface =
`
  namespace Dapper.WebApi.Services.Queries
  {
      public interface I${this.classSingleUpper}CommandText
      {\n`;

      this.getAll_CommandTextInterface = this.incGetAll === false? '':
`         string Get${this.classPluralUpper} { get; }\n`;
      this.getById_CommandTextInterface = this.incGetById === false? '':
`         string Get${this.classSingleUpper}ById { get; }\n`;
      this.create_CommandTextInterface = this.incCreate === false? '':
`         string Create${this.classSingleUpper} { get; }\n`;
      this.update_CommandTextInterface = this.incUpdate === false? '':
`         string Update${this.classSingleUpper} { get; }\n`;
      this.delete_CommandTextInterface = this.incDelete === false? '':
`         string Delete${this.classSingleUpper} { get; }\n`;
      this.closeBase_CommandTextInterface =
`     }
  }
`;
  
      this.code_CommandTextInterface = this.openBase_CommandTextInterface +
                                        this.getAll_CommandTextInterface +
                                        this.getById_CommandTextInterface +
                                        this.create_CommandTextInterface +
                                        this.update_CommandTextInterface +
                                        this.delete_CommandTextInterface +
                                        this.closeBase_CommandTextInterface

}
  

getCommandTextCode() {

  let fieldList = '';
    this.tableFields.forEach((element: DbData,idx, array) => {
      fieldList = fieldList + '@' + element.fieldName;
      fieldList = idx === array.length - 1? fieldList: fieldList + ', ';
    });
  
    let fieldListLessId = fieldList.replace('@Id, ','');

  this.openBase_CommandText =
  `namespace Dapper.WebApi.Services.Queries
  {
      public class ${this.classSingleUpper}CommandText : I${this.classSingleUpper}CommandText
      {\n`;
      this.getAll_CommandText = this.incGetAll === false? '':
`          public string Get${this.classPluralUpper} => "spGet${this.classPluralUpper} @UserId";\n`;
      this.getById_CommandText = this.incGetById === false? '':
`          public string Get${this.classSingleUpper}ById => "spGet${this.classSingleUpper}ById @Id, @UserId";\n`;
      this.create_CommandText = this.incCreate === false? '':
`          public string Create${this.classSingleUpper} => "spCreate${this.classSingleUpper} ${fieldListLessId}";\n`;
      this.update_CommandText = this.incUpdate === false? '':
`          public string Update${this.classSingleUpper} => "spUpdate${this.classSingleUpper} ${fieldList}";\n`;
      this.delete_CommandText = this.incDelete === false? '':
`          public string Delete${this.classSingleUpper} => "spDelete${this.classSingleUpper} @Id,@IsDeleted,@DeletionTime,@DeleterUserId";\n`;
      this.closeBase_CommandText =
`     }
  }`;

  this.code_CommandText = this.openBase_CommandText +
                                        this.getAll_CommandText +
                                        this.getById_CommandText +
                                        this.create_CommandText +
                                        this.update_CommandText +
                                        this.delete_CommandText +
                                        this.closeBase_CommandText

}

getRepositoryInterfaceCode() {

  let fieldList = '';
    this.tableFields.forEach((element: DbData,idx, array) => {
      fieldList = fieldList + '@' + element.fieldName;
      fieldList = idx === array.length - 1? fieldList: fieldList + ', ';
    });
  
    let fieldListLessId = fieldList.replace('@Id, ','');

  this.openBase_RepositoryInterface =
`  using Dapper.WebApi.Dto;
  using System.Collections.Generic;
  using System.Threading.Tasks;
  
  namespace Dapper.WebApi.Services
  {
      public interface I${this.classSingleUpper}Repository
      {\n`;
      this.getAll_RepositoryInterface = this.incGetAll === false? '':
`          Task<IEnumerable<${this.classSingleUpper}Dto>> Get${this.classPluralUpper}(long userId);\n`;
      this.getById_RepositoryInterface = this.incGetById === false? '':
`          ValueTask<${this.classSingleUpper}Dto> Get${this.classSingleUpper}ById(long id, long userId);\n`;
      this.create_RepositoryInterface = this.incCreate === false? '':
`          Task Create${this.classSingleUpper}(${this.classSingleUpper}Dto entity);\n`;
      this.update_RepositoryInterface = this.incUpdate === false? '':
`          Task Update${this.classSingleUpper}(${this.classSingleUpper}Dto entity);\n`;
      this.delete_RepositoryInterface = this.incDelete === false? '':
`          Task Delete${this.classSingleUpper}(${this.classSingleUpper}Dto entity);\n`;
      this.closeBase_RepositoryInterface =
`     }
  }`;

  this.code_RepositoryInterface = this.openBase_RepositoryInterface +
                                        this.getAll_RepositoryInterface +
                                        this.getById_RepositoryInterface +
                                        this.create_RepositoryInterface +
                                        this.update_RepositoryInterface +
                                        this.delete_RepositoryInterface +
                                        this.closeBase_RepositoryInterface
  
}

// PhoneNumber = entity.PhoneNumber,
// Sequence = entity.Sequence,
// OrganizationUnitId = entity.OrganizationUnitId,
// CreationTime = entity.CreationTime,
// CreatorUserId = entity.CreatorUserId,
// IsDeleted = entity.IsDeleted,
// LegacyId = entity.LegacyId,
// LegacyType = entity.LegacyType

getRepositoryCode() {
  let fieldList = '';
  this.tableFields.forEach((element: DbData,idx, array) => {
    fieldList = fieldList + '                      ' + element.fieldName + ' = entity.' + element.fieldName;
    fieldList = idx === array.length - 1? fieldList: fieldList + ',\n';
  });

  let fieldListLessId = fieldList.replace('Id = entity.Id,','');

this.openBase_Repository =
`using Dapper.WebApi.Dto;
using Dapper.WebApi.Services.Queries;
using System.Collections.Generic;
using System.Data.Common;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Dapper.WebApi.Services
{
    public class ${this.classSingleUpper}Repository : BaseRepository, I${this.classSingleUpper}Repository
    {
        private readonly I${this.classSingleUpper}CommandText _commandText;

        public ${this.classSingleUpper}Repository(IConfiguration configuration, I${this.classSingleUpper}CommandText commandText) : base(configuration)
        {
            _commandText = commandText;

        }\n`;

    this.getAll_Repository = this.incGetAll === false? '':
`        public async Task<IEnumerable<${this.classSingleUpper}Dto>> Get${this.classPluralUpper}(long userId)
        {

            return await WithConnection(async conn =>
            {
              var query = await conn.QueryAsync<${this.classSingleUpper}Dto>(_commandText.Get${this.classPluralUpper}, new { UserId = userId });
              return query;
            });
        }\n`;

    this.getById_Repository = this.incGetById === false? '':
`        public async ValueTask<${this.classSingleUpper}Dto> Get${this.classSingleUpper}ById(long id, long userId)
        {
            return await WithConnection(async conn =>
            {
                var query = await conn.QueryFirstOrDefaultAsync<${this.classSingleUpper}Dto>(_commandText.Get${this.classSingleUpper}ById, new { Id = id, UserId = userId });
                return query;
            });
        }\n`;

    this.create_Repository = this.incCreate === false? '':
`        public async Task Create${this.classSingleUpper}(${this.classSingleUpper}Dto entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.Create${this.classSingleUpper},
                    new
                    { 
${fieldListLessId}
                    });
            });
        }\n`;

    this.update_Repository = this.incUpdate === false? '':
`        public async Task Update${this.classSingleUpper}(${this.classSingleUpper}Dto entity)
        {
            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.Update${this.classSingleUpper},
                    new
                    {
${fieldList}
                    });
            });
        }\n`;

    this.delete_Repository = this.incDelete === false? '':
`        public async Task Delete${this.classSingleUpper}(${this.classSingleUpper}Dto entity)
        {

            await WithConnection(async conn =>
            {
                await conn.ExecuteAsync(_commandText.Delete${this.classSingleUpper},
                    new
                    {
                        Id = entity.Id,
                        IsDeleted = entity.IsDeleted,
                        DeletionTime = entity.DeletionTime,
                        DeleterUserId = entity.DeleterUserId
                    });
            });

        }\n`;

    this.closeBase_Repository =
`     }
}`;

this.code_Repository = this.openBase_Repository +
                                      this.getAll_Repository +
                                      this.getById_Repository +
                                      this.create_Repository +
                                      this.update_Repository +
                                      this.delete_Repository +
                                      this.closeBase_Repository
}

  
  
  
  
  
  
  copyControllerText() {
    navigator.clipboard.writeText(this.code_Controller);
    this.codeControllerCopyText = 'Copied!';

    setTimeout(() => {
      this.codeControllerCopyText = 'Copy';
    }, 1000);
  }

  copyText(e:string) {
    switch (e) {
      case 'controller':
        
        navigator.clipboard.writeText(this.code_Controller);
        this.codeControllerCopyText = 'Copied!';

        setTimeout(() => {
          this.codeControllerCopyText = 'Copy';
        }, 1000);

      break;
      case 'dto':

        navigator.clipboard.writeText(this.code_Dto);
        this.codeDtoCopyText = 'Copied!';

        setTimeout(() => {
          this.codeDtoCopyText = 'Copy';
        }, 1000);

      break;
      case 'commandTextInterface':

        navigator.clipboard.writeText(this.code_CommandTextInterface);
        this.codeCommandTextInterfaceCopyText = 'Copied!';

        setTimeout(() => {
          this.codeCommandTextInterfaceCopyText = 'Copy';
        }, 1000);

      break;
      case 'commandText':

        navigator.clipboard.writeText(this.code_CommandText);
        this.codeCommandTextCopyText = 'Copied!';

        setTimeout(() => {
          this.codeCommandTextCopyText = 'Copy';
        }, 1000);

      break;
      case 'repositoryInterface':

        navigator.clipboard.writeText(this.code_RepositoryInterface);
        this.codeRepositoryInterfaceCopyText = 'Copied!';

        setTimeout(() => {
          this.codeRepositoryInterfaceCopyText = 'Copy';
        }, 1000);

      break;
      case 'repository':

        navigator.clipboard.writeText(this.code_Repository);
        this.codeRepositoryCopyText = 'Copied!';

        setTimeout(() => {
          this.codeRepositoryCopyText = 'Copy';
        }, 1000);

      break;
    
      default:
        break;
    }

  }

}
