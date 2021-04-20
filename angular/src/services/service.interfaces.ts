export interface PropsContrato{
    prestador_id:number;
      data_inicio:string;
      data_fim:string
      servico_prestado:string;
  }
  export interface PropsPrestador{
    bairro            : string;
    cep               : string;
    cidade_id         : number;
    complemento       : string;
    cpf_cnpj          : string;
    email             : string;
    logradouro        : string;
    nome_razao_social : string;
    numero            : string;
    tipo              : string;
    uf_id             : number;
  }