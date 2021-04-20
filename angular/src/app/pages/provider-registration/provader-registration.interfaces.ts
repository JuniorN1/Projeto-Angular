export interface PropsError{
    message     : string;
    name        : string;
    ok          : boolean;
    status      : number;
    statusText  : string;
    url         : string;
  }
  
  export interface PropsCepResult{
    cep         : string;
    logradouro  : string;
    complemento : string;
    bairro      : string;
    localidade  : string;
    uf          : string;
    ibge        : string;
    gia         : string;
    ddd         : string;
    siafi       : string;
  }
  export interface PropsCidades{
    cidade_id : number;
    cidade    : string;
  
  }
  export interface PropsUfs{
    uf_id : number;
    uf    : string;
  
  }
  export interface PropsResponseQuery{
    data        : PropsPrestador[];
    informacao  : string|null;
    msg         : string;
    status      : number;
    cidades     : PropsCidades[];
    ufs         : PropsUfs[];
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