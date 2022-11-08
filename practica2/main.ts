import { Application, Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import { postTransition, postUser } from "./crud/post.ts"; 
import { deleteUser } from "./crud/delete.ts";
import { getUser } from "./crud/get.ts";
import { User } from "./types.ts";

const router=new Router();
let users: User[] = []
router
.get("/getUser/:user", (context)=>{

  if (context.params?.user) {

     const user: User | undefined = users.find(

       (user) => user.email || user.telefono || user.id || user.iban || user.dni === context.params.user
      
     );
    
     

        context.response.body = user;

        context.response.status = 200;

        return;

      

    }

    context.response.body = "usuario no encontrado";

    context.response.status = 404;

})
  .post("/addUser",postUser)
  .delete("/deleteUser/:email",deleteUser)
  .post("/addTransaction",postTransition)
  
const app=new Application();
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({port:7777});


