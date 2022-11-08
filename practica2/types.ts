export type User={
    id:string,
    dni:string,
    nombre:string,
    apellido:string,
    telefono:number,
    email:string,
    iban:string  
  }
  export type Transiciones={
    id:string,
    ID_Sender:string,
    ID_Reciver:string,
    amount:number
  }