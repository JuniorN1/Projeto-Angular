import { Request, Response } from "express";
import * as yup from 'yup';
import connection from '../../connection/index';
interface PropsPrestador{
    tipo:string;
    cpf_cnpj:string;
    nome_razao_social:string;
    email:string;
    cep:string;
    logradouro:string;
    numero:number;
    complemento:string;
    bairro:string;
    cidade_id:number;
    uf_id:number;
    delete_status:boolean;
}
class PrestadorController{
    async show(request:Request,response:Response){
    
    }
    async index(request:Request,response:Response){
        const { page } = request.query;

        const schema = yup.object().shape({
            page:yup.number().required(),
        }); 
             
        try{
            await schema.validate(request.query,{abortEarly:false});
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }
        const [count] = await connection("prestador") 
        .where('delete_status',false)
        .count();
        try{
           const prestadores = await connection("prestador")
            .where('delete_status',false)
            .limit(5)
            .offset((Number(page)-1)*5)
            response.header('count',String(count['count(*)']));  
            response.status(200).json({               
                status:200,
                msg:"Lista carregada com sucesso!",
                informacao:null,
                data:prestadores,
            });
            return response;
        }catch(err){
       
            response.status(500).json({
                data:null,
                status:500,
                msg:"Não foi possivel carregar a lista!",
                informacao:null
            });
            return response;
        }
    }
    async create(request:Request,response:Response){
        const{
            tipo,
            cpf_cnpj,
            nome_razao_social,
            email,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade_id,
            uf_id

        } = request.body as PropsPrestador;

        const schema = yup.object().shape({
            tipo:yup.string().required(),
            cpf_cnpj:yup.string().required(),
            nome_razao_social:yup.string().required(),
            email:yup.string().email().required(),
            cep:yup.string().required(),
            logradouro:yup.string().required(),
            numero:yup.string().required(),
            complemento:yup.string().required(),
            bairro:yup.string().required(),
            cidade_id:yup.string().required(),
            uf_id:yup.string().required(),

        });      
        try{
            await schema.validate(request.body,{abortEarly:false});
        }catch(err){
      
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }
        const trx = await connection.transaction(); 
        try{
            const dados_prestador ={
                tipo,
                cpf_cnpj,
                nome_razao_social,
                email,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade_id,
                uf_id,
                delete_status:false
            }
            const verificando:PropsPrestador[] =await connection('prestador').where(
                dados_prestador
            )
            if(verificando.length>1){
                return response.status(200).json({
                    msg:"Já existe um prestador igualmente cadastrado no sistema!",
                    status:200

                });
            }
           
            await trx("prestador").insert(dados_prestador);
            await trx.commit();
            response.status(200).json({
                msg:"Novo prestador adicionado com sucesso!",
                status:201,
                informacao:null
            })
            return response;
        }catch(err){

            await trx.rollback();
            response.status(500).json({
                msg:"Erro ao Adicionar novo Prestador!",
                status:500,
                informacao:err
            })
            return response
            
        }

    }
    async alter(request:Request,response:Response){
        const{
            prestador_id,
            tipo,
            cpf_cnpj,
            nome_razao_social,
            email,
            cep,
            logradouro,
            numero,
            complemento,
            bairro,
            cidade_id,
            uf_id,
            delete_status
        } = request.body;
        const schema = yup.object().shape({
            prestador_id:yup.number().required(),
            tipo:yup.string().required(),
            cpf_cnpj:yup.string().required(),
            nome_razao_social:yup.string().required(),
            email:yup.string().email().required(),
            cep:yup.string().required(),
            logradouro:yup.string().required(),
            numero:yup.string().required(),
            complemento:yup.string().required(),
            bairro:yup.string().required(),
            cidade_id:yup.string().required(),
            uf_id:yup.string().required(),
            delete_status:yup.bool().required(),

        });      
        try{
            await schema.validate(request.body,{abortEarly:false});
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }

        const trx = await connection.transaction(); 
        try{
            const dados_prestador:PropsPrestador ={
                tipo,
                cpf_cnpj,
                nome_razao_social,
                email,
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade_id,
                uf_id,
                delete_status
            }
            const verificando:PropsPrestador[] =await connection('prestador').where(
                dados_prestador
            )
            if(verificando.length<=0){
                return response.status(200).json({
                    msg:"Prestador nao encontrado!",
                    status:200
                });
            }
            await trx("prestador").update(dados_prestador).where("prestador_id",prestador_id);
            await trx.commit();
            response.status(200).json({
                msg:"Prestador Atualizado com sucesso!",
                status:201,
                informacao:null
            })
            return response;
        }catch(err){
          
            await trx.rollback();
            response.status(500).json({
                msg:"Erro ao Atualizar novo Prestador!",
                status:500,
                informacao:err
            });
            return response;
            
        }
    }
  
}

export default PrestadorController;