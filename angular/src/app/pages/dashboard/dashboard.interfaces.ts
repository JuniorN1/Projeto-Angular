import { NzTableFilterFn, NzTableFilterList, NzTableSortFn, NzTableSortOrder } from "ng-zorro-antd/table";

export interface ItemsConsultas {
    bairro:string;
    cep: string;
    cidade_id: string;
    complemento: string;
    contrato_id: number;
    cpf_cnpj: string;
    data_fim: string;
    data_inicio: string;
    delete_status: false
    email: string;
    logradouro: string;
    nome_razao_social: string;
    numero: string;
    pivo_prestador_id: number;
    prestador_id: number;
    servico_prestado: string;
    tipo:string;
    uf_id:string;
  
  }
export interface ItemData{
    cpf_cnpj: string;
    data_inicio: string;
    data_fim: string;
    nome_razao_social: string;
    servico_prestado: string;
    dias:number;
    categoria:string;
}
export interface PropsConsultaContrato{
    status: number;
    msg: string;
    informacao: number | null;
    data:ItemsConsultas[],
}
export interface PropsResponseQuery{
    data: ItemsConsultas[];
    informacao: string|null;
    msg: string;
    status: number;
}
export interface PropsError{
    message: string;
    name: string;
    ok: boolean;
    status: number;
    statusText: string;
    url: string;
}

export interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn | null;
    filterMultiple: boolean;
    sortDirections: NzTableSortOrder[];
  }