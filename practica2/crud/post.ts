
import { RouterContext } from "https://deno.land/x/oak@v11.1.0/router.ts";
import { TransitionSchema, UserSchema } from "../db/schemas.ts";
import { Transiciones, User } from "../types.ts";
import { TransactionsCollection, UserCollection } from "../db/mongo.ts";
import { ObjectId } from "https://deno.land/x/web_bson@v0.2.5/mod.ts";
type PostUserContext=RouterContext<"/addUser", Record<string | number, string | undefined>, Record<string, any>>;
export const postUser=async(ctx:PostUserContext)=>{
    const result =ctx.request.body({type:"json"});
    const value=await result.value;
    if(!value?.nombre||!value?.email||!value?.apellido||!value?.telefono||!value?.dni){
        ctx.response.body="No se han introducido todos los datos";
        console.error("No se han introducido todos los datos");
        
        ctx.response.status=400;
        return;
    }else if(value.iban.length!=24){
        ctx.response.status=401;
        ctx.response.body="La longitud del codigo IBAN no es correcta"
        console.error("La longitud del codigo IBAN no es correcta");
        return
    }else if(value.dni.length!=9){
        ctx.response.status=401;
        ctx.response.body="La longitud del codigo DNI no es correcta"
        console.error("La longitud del codigo DNI no es correcta");
        return
    }else if(value.email.search("@")===(-1)){
        ctx.response.body="Tipo de correo invalido solo puede ser @gmail";
        console.error("Tipo de correo invalido solo puede ser @gmail");
        ctx.response.status=401;
        return;
    }
    const user:Partial<User>={
        dni:value.dni,
        nombre:value.nombre,
        apellido:value.apellido,
        telefono: value.telefono,
        email:value.email,
        iban:value.iban
    }
    const id=await UserCollection.insertOne(user as UserSchema);
    user.id=id.toString();
    ctx.response.body={
        id:user.id,
        nombre:user.nombre,
        dni:user.dni,
        apellido:user.apellido,
        telefono:user.telefono,
        email:user.email,
        iban:user.iban
    }
}
type postTransitionContext=RouterContext<"/addTransaction", Record<string | number, string | undefined>, Record<string, any>>;
export const postTransition=async (ctx:postTransitionContext)=>{
    const result=ctx.request.body({type:"json"});
    const value=await result.value;
    if(!value?.ID_Sender||!value?.ID_Reciver||!value?.amount){
        ctx.response.body="No se han introducido todos los datos";
        ctx.response.status=400;
        console.error("No se han introducido todos lo datos");
        return
    }
    
    const transition:Partial<Transiciones>={
        ID_Reciver:value.ID_Reciver,
        ID_Sender:value.ID_Sender,
        amount:value.amount
    }
    const id=await TransactionsCollection.insertOne(transition as TransitionSchema)
    transition.id=id.toString();
    ctx.response.body={
        id:transition.id,
        ID_Reciver:transition.ID_Reciver,
        ID_Sender:transition.ID_Sender,
        amount:transition.amount
    }
}   
