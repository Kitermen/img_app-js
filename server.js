import http, { get } from 'http';
import imageRouter from './app/routing/imageRouter.js';
import tagsRouter from "./app/routing/tagsRouter.js";
import filtersRouter from "./app/routing/filtersRouter.js";
import usersRouter from "./app/routing/usersRouter.js";
import profilesRouter from "./app/routing/profilesRouter.js";

import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

import 'dotenv/config'


//const PORT = process.env.PORT || 3000;

let token = undefined;


function verifyToken(token){
   try{
      let decoded = verify(token, process.env.SECRET_KEY)
      return decoded;
   }
   catch(error){
      return { message: error.message };
   }
}

http.createServer(async (req, res) => {

   function getToken(){
      if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
         // czytam dane z nagłowka
         token = req.headers.authorization.split(" ")[1]
         //console.log(token);
         return token;
      }
   }

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

      //profiles router
      else if(req.url.search("/api/profile") != -1){
         let token = getToken();
         let decoded = verifyToken(token);
         //console.log("DECO", decoded);
         if(!decoded.hasOwnProperty("message")){
            await profilesRouter(req, res, decoded)
         }
         else{
            console.log("czuje sie tak staro");
            return
         }
      }
   

}).listen(process.env.APP_PORT, () => console.log("listen"))
// lub .listen(PORT, () => console.log("Listening on 3000"));
// lub .listen(3000, () => console.log("listen on 3000"))