import { Request, Response } from "express";
import Auth from '../../auth/index';
import connection from '../../connection/index';
import * as yup from 'yup';
interface Props{
    usuario_nome:string;
    usuario_senha:string;
}
class LoginController{
    async show(request:Request,response:Response){        
        const { 
            usuario_nome,
            usuario_senha
        } = request.body;


        const auth = new Auth();
        const schema = yup.object().shape({
            usuario_nome:yup.string().required(),
            usuario_senha:yup.string().required(),
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
        try{
            const query  = {
                usuario_nome,
                usuario_senha
            }
            const resultado:Props[] = await  connection('usuarios')
            .where(query)
            .select("usuario_nome","usuario_senha");

            if(!resultado.length){
                return response.status(404).json({
                    msg:"O usúario ou senha incorretos!"
                });
            }
            const dados_para_token = {
                usuario_nome,
                usuario_senha
            }
            const token =await auth.createAuth(dados_para_token);
            if(token.status === 500){

                return response.status(token.status).json({
                    msg:token.msg,
                    informacao:token.informacao
                })
            }            
            response.header('authorization',String(token.token))
            response.status(200).json({
                msg:"Logado com sucesso!",
                informacao:null
            });
            return response;
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }

    }

}

export default LoginController;