import { Request, Response } from "express";
import * as yup from 'yup';
import connection from "../../connection";
interface PropsContato{
    pivo_prestador_id:number;
    contrato_id:number;
    prestador_id:number;
    data_inicio:string;
    data_fim:string;
    servico_prestado:string;
    delete_status:boolean;
}
class ContratoController{
    async index(request:Request,response:Response){
        try{
            //CONTAGEM DE REGISTRO
        
            //CONSULTANDO REGISTROS NÃO DELETADOS ULTILIZANDO FALSE COMO SOFT DELETE
            const prestadores_contrato = await connection("pivo_prestador_contrato")
            .innerJoin('contrato','pivo_prestador_contrato.contrato_id','=','contrato.contrato_id') 
            .innerJoin('prestador','pivo_prestador_contrato.prestador_id','=','prestador.prestador_id')    
            .where('pivo_prestador_contrato.delete_status',false);
            //INCLUINDO  MENSSAGEM JSON
            response.status(200).json({               
                status:200,
                msg:"Lista carregada com sucesso!",
                informacao:null,
                data:prestadores_contrato,
            });
            //RETORNO DO RESPONSE
            return response;
        }catch(err){
            response.status(500).json({
                data:null,
                status:500,
                msg:"Não foi possivel carregar a lista!",
                informacao:null
            });
            return response
        }

    }
    async create(request:Request,response:Response){
        const {
            prestador_id,
            data_inicio,
            data_fim,
            servico_prestado,
        } = request.body as PropsContato;      
        // REGRAS DE VERIFICAÇÃO
        const schema = yup.object().shape({
            prestador_id:yup.number().required(),
            data_inicio:yup.string().required(),
            data_fim:yup.string().required(),
            servico_prestado:yup.string().required(),
        }); 
             
        try{
            // CHAMANDO E APLICANDO AS REGRAS 
            await schema.validate(request.body,{abortEarly:false});
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }
        // INICIANDO O TRX 
        const trx = await connection.transaction(); 
        try{
            //PREPARANDO DADOS NECESSARIOS PARA INSERÇÃO N 1
            const dados_contrato ={
                prestador_id,
                data_inicio,
                data_fim,
                servico_prestado,
            }
            //VERIFICANDO SE NAO EXISTE OUTRO REGISTRO IDENTICO NA BASE
            const verificando:PropsContato[] =await connection('contrato').where(
                dados_contrato
            )
            if(verificando.length>1){
                return response.status(200).json({
                    msg:"Já existe um contrato igualmente cadastrado no sistema!",
                    status:200

                });
            }
            // INSERINDO DADOS NA BASE , TABELA CONTRATO E SELECIONANDO ID DE INSERÇÃO DANDO UM RETORNO NO MESMO
            const [contrato_id]= await trx("contrato")
            .insert(dados_contrato)
            .returning("contrato_id");
            
            //PREPARANDO DADOS NECESSARIOS PARA INSERÇÃO N 2
            const dados_pivo_prestador_contrato={
                    prestador_id,
                    contrato_id,
                    delete_status:false
            }
            //INSERINDO DADOS NA BASE, TABELA PIVO PRESTADOR E CONTRAT
            await trx("pivo_prestador_contrato").insert(dados_pivo_prestador_contrato);
            // SALVANDO NO BANCO DE DADOS    
            await trx.commit();
            //INCLUINDO  MENSSAGEM JSON
            response.status(200).json({
                msg:"Novo contrato adicionado com sucesso!",
                status:201,
                informacao:null
            })
             //RETORNO DO RESPONSE
            return response;
        }catch(err){

            await trx.rollback();
            response.status(500).json({
                msg:"Erro ao Adicionar novo contrato!",
                status:500,
                informacao:err
            })
            return response;
        }
    }
    async alter(request:Request,response:Response){
        const {
            pivo_prestador_id,
            contrato_id,
            data_inicio,
            data_fim,
            servico_prestado,
            delete_status


        } = request.body as PropsContato;
         // REGRAS DE VERIFICAÇÃO
        const schema = yup.object().shape({
            pivo_prestador_id:yup.number().required(),
            contrato_id:yup.number().required(),
            data_inicio:yup.string().required(),
            data_fim:yup.string().required(),
            servico_prestado:yup.string().required(),
            delete_status:yup.boolean().required(),
        }); 
             
        try{
            // CHAMANDO E APLICANDO AS REGRAS 
            await schema.validate(request.body,{abortEarly:false});
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }
        // INICIANDO O TRX 
        const trx = await connection.transaction(); 
        try{
            //PREPARANDO DADOS NECESSARIOS PARA ATUALIZAÇÃO N 1
            const dados_contrato ={
                data_inicio,
                data_fim,
                servico_prestado,
            }
            const verificando:PropsContato[] =await connection('contrato').where(
                "contrato_id",contrato_id
            )
            if(verificando.length<=0){
                return response.status(200).json({
                    msg:"Contrato nao encontrado!",
                    status:200
                });
            }
            await trx("contrato").update(dados_contrato).where("contrato_id",contrato_id);
            await trx("pivo_prestador_contrato").update({delete_status}).where("pivo_prestador_id",pivo_prestador_id);
            
            await trx.commit();
            response.status(200).json({
                msg:"Contrato Atualizado com sucesso!",
                status:201,
                informacao:null
            })
            return response;
        }catch(err){
            await trx.rollback();
            response.status(500).json({
                msg:"Erro ao Atualizar contrato!",
                status:500,
                informacao:err
            })
            return response;
            
        }
    }

}

export default ContratoController;