import { Request, Response } from "express";
import callCep from "../../services";
import * as yup from 'yup';

interface PropsCepResult{
    cep:string;
    logradouro:string;
    complemento:string;
    bairro:string;
    localidade:string;
    uf:string;
    ibge:string;
    gia:string;
    ddd:string;
    siafi:string;
}
class CepController{
    async show(request:Request,response:Response){
        const {
            cep
        } = request.query ;
        const schema = yup.object().shape({
            cep:yup.string().required(),
        });              
        try{
            // CHAMANDO E APLICANDO AS REGRAS 
            await schema.validate(request.query,{abortEarly:false});
        }catch(err){
            return response.status(500).json(
                {
                    msg:"Erro!",
                    informacao:err
                }
            )
        }
        try{
            const dados_cep = await callCep.get(`${cep}/json/unicode/`);
            const data = dados_cep.data as  PropsCepResult;

            response.status(200).json(data);
            return response;
        }catch(erro){
            response.status(200).json(erro);
            return response;
        }
    }
}
export default CepController;