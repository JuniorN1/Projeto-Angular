import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { en_US, NzI18nService, pt_BR } from 'ng-zorro-antd/i18n';
import { ServicesApi } from '../../../services/service.service';
import { PropsCarregarPrestador, PropsContato, PropsError, PropsResponseQuery } from './contract-registration.interfaces';
@Component({
  selector: 'app-contract-registration',
  templateUrl: './contract-registration.component.html',
  styleUrls: ['./contract-registration.component.css']
})
export class ContractRegistrationComponent implements OnInit {
  contrato          : PropsContato | any        = {};
  dados_prestador   : PropsCarregarPrestador[]  = [];
  razaoSocial      ?: string;
  validateForm     !: FormGroup;
  isEnglish         = false;

  constructor(
    private fb        : FormBuilder,
    private i18n      : NzI18nService,
    private services  : ServicesApi
  ) {}

  submitForm(): void {   
    for (const i in this.validateForm.controls) {   
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    } 
    if(
      this.contrato.data_fim         === undefined ||
      this.contrato.data_inicio      === undefined ||
      this.contrato.prestador_id     === undefined ||
      this.contrato.servico_prestado === undefined
    ){
      alert(
        "Menssagem:Prencha todos os campos"            
      )
      return;
    }
    
    this.services.AdicionarContrato(this.contrato).subscribe(
      (resp)=>{
        const {msg,informacao} = resp.body as PropsResponseQuery;
        alert(
          "Menssagem:"+msg+'\n'+
          "informação:"+(informacao===null?"Sucesso":informacao)            
        )
        return;          
      },
      (error:PropsError)=>{
        alert(
          "Error de Conexao:\n"+
          "name :"+error.name+'\n'+
          "status :"+error.status+'\n'+
          "statusText :"+error.statusText+'\n'+
          "ok:"+error.ok+'\n'+
          "message:"+error.message+'\n'+
          "url:"+error.url
        )
      }
    )    
  }
  selectCpf(buscarCpf:string): void {
    const found = this.dados_prestador.find(
      (element:PropsCarregarPrestador)=>element.prestador_id==buscarCpf
    );  
    this.razaoSocial = found?.nome_razao_social;    
  }
  changeLanguage(): void {
    this.i18n.setLocale(this.isEnglish ? pt_BR : en_US);
    this.isEnglish    = !this.isEnglish;
  }
  ChamarConsulta():void{
    this.services.CarregarPrestadores().subscribe(
      (resp)=>{
        const {data,status,msg,informacao} = resp.body as PropsResponseQuery;
        if( status != 200 ){
          alert(
            msg+'\n'+informacao
          )
          return;
        }      
        this.dados_prestador = data
      },  
      (error:PropsError)=>{
        alert(
          "Error de Conexao:\n"+
          "name :"+error.name+'\n'+
          "status :"+error.status+'\n'+
          "statusText :"+error.statusText+'\n'+
          "ok:"+error.ok+'\n'+
          "message:"+error.message+'\n'+
          "url:"+error.url
        )
      }
    );   
  }
  ngOnInit(): void {
    this.ChamarConsulta();
    this.validateForm = this.fb.group({   
      selectCpfCnpj   : [null, [Validators.required]],
      service         : [null, [Validators.required]],
      dataInicio      : [null, [Validators.required]],
      dataFinal       : [null, [Validators.required]]
 
    });
  }
}

