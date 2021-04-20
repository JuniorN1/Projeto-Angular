import { Component, OnInit } from '@angular/core';
import { ServicesApi } from 'src/services/service.service';
import { ColumnItem, ItemData, ItemsConsultas, PropsConsultaContrato, PropsError } from './dashboard.interfaces';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vence_depois  = 0;
  vence_30_dias = 0;
  vence_15_dias = 0;
  vence_7_dias  = 0;
  vence_hj      = 0;
  visible       = false;
  searchValue   = '';
  formatOne     = (percent: number) => `${percent} Days`;
  public doughnutChartLabels: Label[] = [
    'Vence Acima de 30 dias',
    'Vence em 30 dias',
    'Vence em 15 dias', 
    'Vence em 7 dias',
    'Vence Hoje',
  ];
  public doughnutChartData: MultiDataSet =[[0,0,0,0,0]];
  public doughnutChartType: ChartType = 'doughnut';
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];
  listOfColumns: ColumnItem[] = [   
    {
      name: 'Razão Social',
      sortOrder: null,
      sortFn: (a: ItemData, b: ItemData) => a.cpf_cnpj.localeCompare(b.cpf_cnpj),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemData) => list.some(name => item.nome_razao_social.indexOf(name) !== -1)
    }, 
    {
      name: 'data Inicio',
      sortOrder: null,
      sortFn: (a: ItemData, b: ItemData) => a.cpf_cnpj.localeCompare(b.cpf_cnpj),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: false,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemData) => list.some(name => item.data_inicio.indexOf(name) !== -1)
    },
    {
      name: 'data Fim',
      sortOrder: null,
      sortFn: (a: ItemData, b: ItemData) => a.cpf_cnpj.localeCompare(b.cpf_cnpj),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [],
      filterFn: (list: string[], item: ItemData) => list.some(name => item.data_fim.indexOf(name) !== -1)
    },
    {
      name: 'Vence em',
      sortOrder: null,
      sortFn: (a: ItemData, b: ItemData) => a.cpf_cnpj.localeCompare(b.cpf_cnpj),
      sortDirections: ['ascend', 'descend', null],
      filterMultiple: true,
      listOfFilter: [
        { text: '30 dias', value: 30 },
        { text: '15 dias', value: 15},
        { text: '7 dias', value: 7 },
        { text: 'Hoje', value: 0 },
      ],
      filterFn: (list: string[], item: ItemData) => list.some(name => item.categoria.indexOf(name) !== -1)
    },
  ];
  dataRestante(data_inicio:string,data_final:string):number{
    const data_vencimento   = new Date(data_final); 
    const data_contrato     = new Date(data_inicio); 
    const diferenca         = Math.abs(data_vencimento.getTime() - data_contrato.getTime()); 
    const dias              = Math.ceil(diferenca / (1000 * 60 * 60 * 24)); 
    if( dias  > 30  )this.vence_depois +=1;  
    if( dias  <=  30  &&  dias  > 15  ) this.vence_30_dias +=1;            
    if( dias  <=  15  &&  dias  > 7   ) this.vence_15_dias +=1;    
    if( dias  <=  7   &&  dias  > 0   ) this.vence_7_dias +=1;
    if( dias  === 0 ) this.vence_hj +=1;     
    return dias;
  }
  EditarFormatoDaData(data:string):string{
    let nova_data:string|string[]   =   data.substring(0,10);
    nova_data                       =   nova_data.split('-');
    nova_data                       =   nova_data[2]+'/'+nova_data[1]+'/'+nova_data[0];
    return nova_data;
  }
  tartarCategoria(dias:number){
    if( dias <= 30 && dias > 15 ) return 30;            
    if( dias <= 15 && dias > 7  ) return 15;    
    if( dias <= 7  && dias > 0  ) return 7;
    if( dias === 0 )              return 0;    
    return 0 ;
  }
  tratarDados(data:ItemsConsultas[]):void{
   this.listOfData  = data.map(
     (
        {
          cpf_cnpj,
          data_inicio,
          data_fim,
          nome_razao_social,
          servico_prestado
          
        }
      )=>{
      const dias  = this.dataRestante(data_inicio,data_fim);
      return (
        { 
          cpf_cnpj,
          data_inicio:this.EditarFormatoDaData(data_inicio),
          data_fim:this.EditarFormatoDaData(data_fim),
          nome_razao_social,
          servico_prestado,
          dias:dias,
          categoria:String(this.tartarCategoria(dias))
        }
      )
    })
  }
  reset(): void {
    this.vence_30_dias  = 0;
    this.vence_15_dias  = 0;
    this.vence_7_dias   = 0;
    this.vence_hj       = 0;
    this.vence_depois   = 0;
    this.searchValue    = '';
    this.ChamarConsulta();
    this.visible        = false;
  }
  search(): void {  
    this.listOfData =this.listOfData.filter(
      (item: ItemData) => item.cpf_cnpj.indexOf(this.searchValue) !== -1
    );
  }
  ChamarConsulta():void{
    this.carregarContratos.CarregarContratos().subscribe(
      (resp)=>{
        const {data,status,msg,informacao} = resp.body as PropsConsultaContrato;
        if(status!=200){
          alert(
            "Menssagem:"+msg+'\n'+
            "informação:"+(informacao===null?"Sucesso":informacao)            
          )
          return;
        }

        this.tratarDados(data);
        this.doughnutChartData=[[this.vence_depois,this.vence_30_dias,this.vence_15_dias,this.vence_7_dias,this.vence_hj]]
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
  ngOnInit(): void {    
    this.ChamarConsulta();

  }
  
  constructor(private carregarContratos:ServicesApi) { }

  

  }


