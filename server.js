import http from 'http';
import imageRouter from './app/routing/imageRouter.js';
import tagsRouter from "./app/routing/tagsRouter.js";
import filtersRouter from "./app/routing/filtersRouter.js";
import usersRouter from "./app/routing/usersRouter.js";
import 'dotenv/config'

//const PORT = process.env.PORT || 3000;

http.createServer(async (req, res) => {

   //photos router
   if(req.url.search("/api/photos") != -1){
      await imageRouter(req, res)
   }
   
   //tags router
   else if(req.url.search("/api/tags") != -1){
      await tagsRouter(req, res)
   }
   
   //filters router
   else if(req.url.search("/api/filters") != -1){
      await filtersRouter(req, res)
   }

   //users router
   else if(req.url.search("/api/user") != -1){
      await usersRouter(req, res)
   }

}).listen(process.env.APP_PORT, () => console.log("listen"))
// lub .listen(PORT, () => console.log("Listening on 3000"));
// lub .listen(3000, () => console.log("listen on 3000"))