import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PropsContrato, PropsPrestador } from './service.interfaces';
@Injectable({
  providedIn: 'root'
})
export class ServicesApi {
  private SERVER_URL ='http://localhost:3333'
  private httpHeaders= new HttpHeaders({
    'content-type':'application/json',
    'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmVzSW4iOjM2MDAsImRhdGEiOiJ7XCJ1c3VhcmlvX25vbWVcIjpcImp1bmlvclwiLFwidXN1YXJpb19zZW5oYVwiOlwiMTIzNDU2NzhcIn0iLCJpYXQiOjE2MTg2OTIwNTZ9.4qhhulYeQKzMgqOQaJweKZN57NeWcBd8QwPHDAIPQ1k'
  })
  constructor(private http:HttpClient) { 
  }
  public CarregarContratos(){
    return this.http.get(
      `${this.SERVER_URL}/listar_contrato`,
      {observe: 'response',headers:this.httpHeaders}
    )
  }

  public  AdicionarContrato(dados:PropsContrato){
   return this.http.post(
      `${this.SERVER_URL}/adicionar_contrato`,
      dados,{observe: 'response',headers:this.httpHeaders}
    )
   
  }
  public AdicionarPrestador(dados:PropsPrestador){ 
    return this.http.post(
      `${this.SERVER_URL}/adicionar_prestador`,dados,
      {observe: 'response',headers:this.httpHeaders}
    );
  }
  
  public CarregarCep(cep:string){
    let params:any = new HttpParams();
    params = params.append('cep', cep);
    return this.http.get(
      `${this.SERVER_URL}/buscar_cep`,
      {observe: 'response',headers:this.httpHeaders,params:params}
    );
  }
  public CarregarUfsCidades(){ 
    return this.http.get(
      `${this.SERVER_URL}/carregar_ufs_cidades`,
      {observe: 'response',headers:this.httpHeaders}
    );
  }

  public CarregarPrestadores(){
    let params:any = new HttpParams();
    params = params.append('page', 1);
    return this.http.get(
      `${this.SERVER_URL}/listar_prestador`,
      {observe: 'response',headers:this.httpHeaders,params:params}
    );
  }
}
