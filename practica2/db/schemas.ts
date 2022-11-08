
import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { User,Transiciones } from "../types.ts";

export type UserSchema= Omit<User, "id"> & { _id: ObjectId };
export type TransitionSchema=Omit<Transiciones,"id">&{_id:ObjectId}