import { NextFunction, Request, response, Response } from 'express';
import jwt from 'jsonwebtoken';
import connection from '../connection';
interface PropsUsuario{
    usuario_nome:string;
    usuario_senha:string;
}
interface Propsheader{
    authorization:string;
}
interface PropsVerify{    
    expiresIn: number;
    data: string;
    iat: number;      
}
class Auth{
    async createAuth(usuario:PropsUsuario){
        try{
            const token =  await jwt.sign({
                expiresIn: 60 * 60 ,
                data: JSON.stringify(usuario)
            }, 'privateKeyishere', { algorithm: 'HS256' });

            return ({
                msg:"Token criado com sucesso!",
                token:token,
                informacao:null,
                status:200
            })
        
        }catch(err){
            return response.status(500).json ({
                msg:"Erro na criação do token!",
                token:null,
                informacao:err,
                status:500
            })
        }
    }
    async verifyAyth(request:Request,response:Response,next:NextFunction){
        const { authorization} =request.headers as Propsheader;     
        try{
            const token  =await jwt.verify(authorization, 'privateKeyishere') as PropsVerify;
            const {
                usuario_nome,
                usuario_senha
            } = JSON.parse(token.data);
            const query  = {
                usuario_nome,
                usuario_senha
            }
            const resultado:PropsUsuario[] = await  connection('usuarios')
            .where(query)
            .select("usuario_nome","usuario_senha");

            if(resultado.length<=0){
                return response.status(404).json({
                    msg:"Logue novamente!"
                });
            }
            next();
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Logue novamente!",
                    informacao:err
                }
            )
        }


    }

}

export default Auth;