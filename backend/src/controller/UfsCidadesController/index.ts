import { Request, Response } from "express";
import * as yup from 'yup';
import connection from "../../connection";
interface PropsCidade{
    cidade_id:number;
    cidade:string;    
}
interface PropsUf{
    uf_id:number;
    uf:string;    
}
// interface PropsLoading{
//     ufs
// }
class UfsCidadesController{
    async index(request:Request,response:Response){     
        try{
         
            //CONSULTANDO REGISTROS NÃO DELETADOS ULTILIZANDO FALSE COMO SOFT DELETE
            const ufsCidades = await Promise.all(
            [ 
                await connection("uf"),
                await connection("cidade"),
            ]
            ).then(
                (value)=>{
                    return value
                }
            )
      
            //INCLUINDO O TOTAL HEADER E  STATUS + MENSSAGEM JSON
    
            response.status(200).json({               
                status:200,
                msg:"Lista carregada com sucesso!",
                informacao:null,
                ufs:ufsCidades[0],
                cidades:ufsCidades[1]
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
            return response;
        }

    }
}

export default UfsCidadesController;