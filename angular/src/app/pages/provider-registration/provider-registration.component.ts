import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesApi } from '../../../services/service.service';
import {PropsCepResult,PropsError,PropsResponseQuery,PropsCidades,PropsUfs,PropsPrestador} from './provader-registration.interfaces';
@Component({
  selector: 'app-provider-registration',
  templateUrl: './provider-registration.component.html',
  styleUrls: ['./provider-registration.component.css']
})
export class ProviderRegistrationComponent implements OnInit {
  prestador    : PropsPrestador |any ={};
  validateForm !: FormGroup;
  ufs          !: PropsUfs[];
  cidades      !: PropsCidades[];
  isVisible     = false;
  
  constructor(  
    private fb                  : FormBuilder,
    private carregarCep         : ServicesApi,
    private carregarUfsCidades  : ServicesApi,
    private adicionarprestador  : ServicesApi
  ) {}
  submitForm(): void {
    for (const i in this.validateForm.controls) {   
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }   
    if(
      this.prestador.bairro             === undefined ||
      this.prestador.cep                === undefined ||
      this.prestador.cidade_id          === undefined ||
      this.prestador.complemento        === undefined ||
      this.prestador.cpf_cnpj           === undefined ||
      this.prestador.email              === undefined ||
      this.prestador.logradouro         === undefined ||
      this.prestador.nome_razao_social  === undefined ||
      this.prestador.numero             === undefined ||
      this.prestador.tipo               === undefined ||
      this.prestador.uf_id              === undefined 

    ){
      alert(
        "Menssagem:Prencha todos os campos"            
      )
      return
    }
 
    this.ChamarAdicao();
  }
  ChamarAlertErro(error:PropsError){
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
  ChamarAdicao():void{
    this.adicionarprestador.AdicionarPrestador(this.prestador).subscribe(
      (resp)=>{
       const {msg,informacao} = resp.body as PropsResponseQuery;
         alert(
           "Menssagem:"+msg+'\n'+
           "informação:"+(informacao===null?"Sucesso":informacao)
         )
         return;
      },
      (error:PropsError)=>{
        this.ChamarAlertErro(error);
      }
    )  
  }
  ChamarConsultaCep():void{
     this.carregarCep.CarregarCep(this.prestador.cep).subscribe(
      (result)=>{
        const body                  = result.body as PropsCepResult;
        this.prestador.logradouro   = body.logradouro;
        this.prestador.complemento  = body.complemento;
        this.prestador.bairro       = body.bairro;
        this.prestador.complemento  = body.complemento;
        this.isVisible = false;
      },
      (error:PropsError)=>{
        this.ChamarAlertErro(error);
      }
     )
  }
  ChamarConsultaUfsCidades():void{
    this.carregarUfsCidades.CarregarUfsCidades().subscribe(
      (resp)=>{
        const {status,msg,informacao,cidades,ufs} = resp.body as PropsResponseQuery;
        if(status!=200){
          alert(
            msg+'\n'+informacao
          )
          return;
        }   
        this.cidades      = cidades;
        this.ufs          = ufs;
      },  
      (error:PropsError)=>{
        this.ChamarAlertErro(error);
      }
    );
  }
  buscarCep():void{
    this.isVisible = true;
    this.ChamarConsultaCep();
  }

  ngOnInit(): void {
   
    this.ChamarConsultaUfsCidades();
    this.validateForm = this.fb.group({   
      tipo                : [null, [Validators.required]],
      cpf_cnpj            : [null, [Validators.required]],
      nome_razao_social   : [null, [Validators.required]],
      email               : [null, [Validators.email,Validators.required]],
      cep                 : [null, [Validators.required]],
      logradouro          : [null, [Validators.required]],
      numero              : [null, [Validators.required]],
      complemento         : [null, [Validators.required]],
      bairro              : [null, [Validators.required]],
      cidade              : [null, [Validators.required]],
      uf                  : [null, [Validators.required]],
    });

  }

}

