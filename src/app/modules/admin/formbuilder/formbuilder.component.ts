import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { from, map } from 'rxjs';
import { AuthService } from 'src/app/layouts/auth/login/services/auth.service';
import * as $ from 'jquery';
import { FormserviceService } from './formservice.service';
import { TicketService } from '../../tickets/components/ticket/ticketservice';
import {ToastModule} from 'primeng/toast';
interface JsonFormControls {
  name: string;
  label: string;
  value: string;
  type: string; 
  required: boolean;
 
  
}
export interface JsonFormData {
  controls: JsonFormControls[];
}
@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
  providers: [
    MessageService,
    TicketService,  
    

    ],
})
export class FormbuilderComponent implements OnInit {
  fbTemplate:any;
  fbEditor :any;
  @Input() currentMsgFromChild1ToChild2: any [];
  public formData: JsonFormData;
  formbuild:any;
  str:any;
  emailTickets: any;
  str2:any;
  output:any;
  projectid:any;
  projectactive:any;
  groupid:any
  isJqueryWorking: any; 
  saveall:any;
  formContainer:any;
  splitvalues:any;
  fbOptions:any;
  progressbar:boolean=false;

  formvaluedata:any;
  outslash:any;
  isLoading: boolean = true;
  allData:any;
  fbInstances: number[] = [];
  formfieldsvalues: number[] = [];
  fbarray:any[]=[];
  value :any= [];
  fields:any=[];
  unique:any[]=[];
  formfieldsvalue:any;
  id:any;
  valuesfoem:any;
  projectname:any;
  formfieldlist:any;
  labelvalue:any;
  getformfield_array:any[]=[];
  getformfieldsubmit_array:any[]=[];
  typevalue:any;
  valuedata:any;
  formvalue:any;
  getjson:any;
  formfields:any=[];
   stuff:any={};
   showspinner:boolean=false;
   outputvalues:any;
   options:any;
   emailPlaceholderText="Select Project Name"
  constructor(  private route: ActivatedRoute,  
     private shareservice: AuthService,
     private formservice: FormserviceService,
     private messageService : MessageService,
     private ticketService: TicketService,
     private router: Router,) { }
  
     ngAfterViewInit(): void {
    this.getBusinessFunctionLOV();

   // console.log("project drop down form field tickets",this.formfieldlist);
  }
  
  ngOnInit(): void {
    console.log("hek");

    this.get_projectactive(); 
 this.formfieldsvalue=[
  {
  className: "form-control",
  label: "First Name",
  placeholder: "Enter your first name",
  name: "2",
  required: true,
  describtion:"2",
  type: "text"
},
];
    jQuery($ => {
      "use strict";
     
      var userAttrs:any = {};
      var newAttributes = {
        disabled: {
            "type": 'checkbox',
            "label": 'disabled'
        },  
      
         
    };
    
   


// const fields = ["autocomplete", "checkbox-group", "date", "number", "radio-group", "select", "text", "textarea"];
// fields.forEach(function (item, index) {
//     userAttrs[item] = newAttributes;
    
// });

      const attrs = [
        'access',
        'className',
        'description',
        'inline',
        'labels',
        'max',
        'maxlength',
        'min',
        'multiple',
        'name',
        'options',
        'other',
        'placeholder',
        'required',
        'rows',
        'step',
        'style',
        'subtype',
        'toggle',
        'value'
      ];
     
     this. options = {
      render: true,
       defaultFields: this.formfieldlist,
      //  defaultFields:this.formfieldsvalue,
      dataType: 'json',
      notify: {
        error: function(message:any) {
          return console.error(message);
        },
        success: function(message:any) {
          return console.log(message);
        },
        warning: function(message:any) {
          return console.warn(message);
        }
      },
      typeUserAttrs: {
       
        text: {
        
          value: {
            label: 'value',
            value: ' ',
          },
          description:{
            label: 'value',
            value: '0',
          },
         
          min: {
            label: 'min',
            value: '0',
            type: 'number',
            
          },
          max: {
            label: 'max',
            type: 'number',
            value: '0',
          },
        //   disabled: {
        //   label:'disabled',
        //     type:'checkbox',
          
          
        // },  
       
      
        },
        select:{
          description:{
            label: 'value',
            value: '0',
          },
        }
      },
 
    
      //disable the defalut attribute 
      disabledAttrs: [
        'access',
        'className',        
        'inline',
        'labels',       
        'maxlength',     
        'multiple',
        'name',    
        'other',
        'placeholder',
        'value',
        'rows',
        'step',
        'style',
        'subtype',
        'required',
        'disabled'
 
        
     
      ],
    
      typeUserDisabledAttrs: {
        'text': [
          'name',
          'className'    ,
          'subtype'    
        ],
        'select':[
          'name',
          'className' 
        ]

      },
      disableFields: ['button','starRating','file','autocomplete','checkbox-group','date','header','hidden',
      'number','paragraph','radio-group','textarea'],
      fieldRemoveWarn: true ,// defaults to false,
      controlOrder: [
        'text',
        'textarea',       
     
      ],     
      layoutTemplates: {
        // onAddField: function(data:any) {
        //   const currentFieldId = data;
        //   alert(currentFieldId);
        // },
        label : function(label:any, data:any) {
console.log("Custom Id",data.describtion);
        // cheeky styling
        return $('<label class="bright" style="margin-top:15px;"/>')
          // .attr('for', data.label)
          // .append(label);
      }
      
      }
     
      // prepend: '<h1>Focusr Tech</h1>', 
      // append: '<h2>Dynamic form builder </h2>'
    };

     this.fbEditor = document.getElementById('fb-editor');
    
    //  Formio.builder(document.getElementById('builder'));
     this.saveall = document.getElementById('save-all');   
     this.fbInstances.push(($( this. fbEditor)as any).formBuilder(this. options ));
     console.log("fbinstance",this.fbInstances);
     this.value.push(this.fbInstances);
   
     this.formContainer=document.getElementById("fb-rendered-form");
    //  var formdatarender= JSON.parse(this.valuesfoem );
    //  var formRenderOptions = {formdatarender};
    //  var frInstance = document.getElementById("fb-rendered-form")as HTMLInputElement | null;
    //  var render =frInstance.formRender();
    //  $('#fb-rendered-form').formRender(formRenderOptions);
  
    // $(this.saveall).click(function(){


    
    //   this.allData=this.value.map((fb:any)=>{      

    //     console.log("Action values",fb[0].actions.getData('json', true));
    //     this.formvalue=fb[0].actions.getData('json',true);   
    //     return fb.formData;
        
    //   });
    //   console.log("Action values array",this.allData);
    //   console.log("values in json format ",this.formvalue);
    //   console.log("Json String",JSON.parse(this.formvalue));
    //  this.fbarray.push(JSON.parse(this.formvalue));
    //   console.log("pused array",this.fbarray);
    //  })
         
           
         });
// this.formfields=[{
//           class: "form-control",
//           label: "First Name",
//           placeholder: "Enter your first name",
//           name: "first-name",
//           required: true,
//           type: "text"
// }];
// this.getlistformvalues();
    // this.getListofformbuilder();
    // this.formfieldsvalue=JSON.parse(localStorage.getItem('formfields'));
    // console.log("values of values",     this.formfieldsvalue);

  }
  get_projectactive() {
    this.ticketService.getListOfActiveProject().subscribe((res) => {
      this.projectactive = res;
      
    });
  }
  getlistformvalues() {
this.progressbar=true;

    this.formservice.getlistalready_formfields(this.projectname).subscribe((res) => {
      this.progressbar=false;
     this.formfieldlist = res;
     this.formfieldlist.filter((val: any) => {
   
console.log("value of description ",val.description);
this.getformfield_array.push(val.label);
     });
     console.log("value of formfields getlist ",this.getformfield_array);
     var formlistvalues = JSON.stringify(this.formfieldlist);
     localStorage.setItem('formfields', formlistvalues);    

// this.formfieldsvalues.push(this.formfields);
     
  
     this.ngOnInit();

    });
  }
  getBusinessFunctionLOV() {

    this.ticketService.getListOfPMOValues().subscribe((res) => {

     this.emailTickets = res;
    //  .filter((val:any)=>val.projectId===6);
  
     console.log("project drop down email tickets",this.emailTickets);

      // if( (this.projectidtk=='0') &&(this.groupname=='{}')){
  
   
      //   alert("projectid with no group");
      //   this.emailTickets=res.filter((val:any)=>val.projectId==='6');
      //   console.log(this.emailTickets);
      // }
      // else if((this.projectidtk!='0')&&(this.groupname=='{}')) {
      //  alert("projectid with no group");
      //  console.log("project-sec",this.projectidtk);
    
      //   this.emailTickets=res.filter((val:any)=>val.projectId===this.projectidtk);
      //   console.log("project value",this.emailTickets);
      // }
      // else if((this.projectidtk!='0')&&(this.groupname!='{}'||this.groupname!='0'!||this.groupname.length!='0'))
      // {
      //   alert("projectid with no group");
      //   this.emailTickets=res.filter((val:any)=>val.projectId==='6');
      //   console.log(this.emailTickets);
      // }

    });
  }
  
  onChange(event: any) {
    // console.log('event :' + event);

    this.projectname = event.value;
    //console.log(this.projectCategoryId);
  
    // this.showgroupsec=true;
    console.log("Project name",  this.projectname );
    this.getformfield_array.length=0;
    // this.arropen.length=0;
    // this.arrclose.length=0;
    // this.arrassign.length=0;
    // this.arrunassign.length=0;

   // this.ngOnInit();

this.getlistformvalues();
//this.ngOnInit();
  
    
    
  }
  get()
  {
  this.progressbar=true;
    // this.isLoading = true;
    this.id= this.route.snapshot.paramMap.get('id');
    console.log("ticketno -",this.id);
    this.projectid=this.shareservice.getprojectid();
    console.log(this.projectid);
    this.groupid=this.shareservice.getgroupname();
    console.log(this.groupid);
    this.value.push(this.fbInstances);
    this.allData=this.value.map((fb:any)=>{      
   console.log("values in array length",fb.length-1);
      var fblength=fb.length-1;
      console.log("Action values",fb[0].actions.getData('json', true));
      this.formvalue=fb[fblength].actions.getData('json',true);   
      return fb.formData;
      
    });
      console.log("Action values array",this.allData);
      console.log("values in json format with brckets ",this.formvalue);
      console.log("values in json format without Brackets ",(this.formvalue).replace(/[[\]]/g, ''));
      console.log("Json String",JSON.parse(this.formvalue));
      this. valuesfoem=(this.formvalue);
      console.log("values of forms ",this.valuesfoem);
      let list: string[] = [];
      let list2: string[] = [];
      let list3: string[] = [];
     
      
      JSON.parse(this.formvalue).forEach((element:any )=> {
        console.log("values of ",element.label,element.value,element.type);
        this.typevalue=element.type;
        this.labelvalue=(element.label+':'+element.value).replace(/[[\]]/g, '');
        console.log("value key pair",this.labelvalue.replace(/[[\]]/g, ''));
        this.formvaluedata=this.labelvalue.replace(/[[\]]/g, '');
        console.log("form data",this.formvaluedata);
        this.valuedata=element.value;
        list.push(this.formvaluedata);
    // const obj:any={}
    // obj[element.label]=element.value;
    // console.log(JSON.stringify(obj).replace(/[[\]]/g, ''));
    

        var s =element.type+','+element.value;
        
        this.stuff[element.label]=s;
        var value=  s.split(',')[1];
        var type=   s.split(',')[0];
        console.log("payload value + type",value ,type);
    


         this.str=JSON.stringify(this.formvaluedata);
         this.str2=this.str.replace(/\//g,"");
         this.output=JSON.parse(this.str2);

         this.outputvalues=JSON.stringify(this.output);
        this.splitvalues=(this.outputvalues).split(',')[1];
       //  console.log("listtt",list.toString());
        // console.log(list2);

      });

     this.fbarray.push(JSON.parse(this.formvalue));
      console.log("pused array",this.fbarray[0]);
     
      

JSON.parse(this.formvalue).filter((value:any)=>{
  console.log("formvalue",value.description);
this.getformfieldsubmit_array.push(value.label);

});
console.log("get",this.getformfield_array);
console.log("submit",this.getformfieldsubmit_array);

const intersection = this.getformfield_array.filter(element => !(this.getformfieldsubmit_array.includes(element)));
console.log("value of intersection",intersection);


      // this.showspinner=true;


      let formfieldpayload = {
       
        projectName: this.projectname,       
        customFields: JSON.parse( this.formvalue )
      }
      console.log("value of formfield",formfieldpayload);
      if((formfieldpayload.customFields==0) && (formfieldpayload.projectName===null || formfieldpayload.projectName==undefined))
      {
      console.log("section",formfieldpayload.customFields);
      this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Form Builder is empty', life: 3000 });
      this.progressbar=false;
      }
      // else if((formfieldpayload.customFields==0 )&& (formfieldpayload.projectName!=null)){
      //   this.messageService.add({ severity: 'warn', summary: 'Failed', detail: 'Form Builder cant be empty', life: 3000 });
      //   this.progressbar=false;
      //   console.log("project")
      // }
      else{
        this.formservice.createformfields(formfieldpayload).subscribe(
          {
           
            next: (val: any) => {
       
            console.log("inside subcribe",val);
            // this.showspinner=false;
      
     
  
            this.progressbar=false;
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Form Builder Updated succesfully', life: 3000 });
              // this.router.navigate(['/dashboard/tickets']);
              let deleteformfield=
              {
                projectName: this.projectname,  
                label:intersection
              }
              console.log("value of ",deleteformfield);
                  this.formservice.deleteSelectedarray(deleteformfield).subscribe(
                    {
                     
                      next: (val: any) => {
                        console.log(val);
                      //  this.messageService.add({ severity: 'warn', summary: 'error', detail: 'Deteleted Successfully', life: 3000 });
                      }});
        
              this.getformfieldsubmit_array.length=0;
  
  
  
  
    
            },
    
            error: (err: any) => {
              
              this.showspinner=false;
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to Active User', life: 3000 });
          
              this.progressbar=false;
            }
    
    
          })
      }
    
  
  }
  getKeyByValue(object:any, value:any) {
    return Object.keys(object).find(key => object[key] === value);
}
getListofformbuilder()
{
  this.formservice.getformfields()
      .subscribe(
        (result) => 
        {
         this.formfields=result;
         console.log("form fields values",this.formfields);
      
         
        })
}

}


