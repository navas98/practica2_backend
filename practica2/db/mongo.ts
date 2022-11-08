import {
    MongoClient,
    Database,
  } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
  import { UserSchema, TransitionSchema } from "./schemas.ts";
  const connecMongoDB= async ():Promise<Database>=>{
  
    const mongourl="mongodb+srv://jnml:javier@cluster0.zm5cfu0.mongodb.net/user?authMechanism=SCRAM-SHA-1"
    const client=new MongoClient();
    await client.connect(mongourl)
    const db= client.database("user");
    return db;
  };
  const db=await connecMongoDB();
  export const UserCollection=db.collection<UserSchema>("user");

  const connectMongoDb=async():Promise<Database>=>{
    const url="mongodb+srv://jnml:javier@cluster0.zm5cfu0.mongodb.net/Transactions?authMechanism=SCRAM-SHA-1";
    const client_=new MongoClient();
    await client_.connect(url);
    const db1=client_.database("Transactions");
    return db1;
  }
  const db1=await connectMongoDb();
  export const TransactionsCollection=db1.collection<TransitionSchema>("transition")