export interface PropsCarregarPrestador{
    cpf_cnpj: string;
    nome_razao_social: string;
    prestador_id: string;
}
export interface PropsResponseQuery{
    data: PropsCarregarPrestador[];
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
export interface PropsContato{
    data_fim: string;
    data_inicio: string;
    prestador_id: number;
    servico_prestado: string;
}