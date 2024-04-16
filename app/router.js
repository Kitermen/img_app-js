import JsonController from "./jsonController.js";
import getRequestData from "./getRequestData.js";
import fileOperations from "./fileController.js";
import * as fs from "fs";
const { submitFile } = fileOperations;

const router = async(req, res)=>{
    if(req.url == "/api/photos" && req.method == "GET"){
        const photos = await getPhotos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(photos, null, 5));
    }

    else if(req.url.match(/\/api\/photos\/([a-z0-9]+)/) && req.method == "GET"){
        try{
            const id = req.url.split("/")[3];
            console.log("id", id);
            const thisPhoto = await getById(id);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(photo, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.url == "/api/photos" && req.method == "POST"){
        //formidable data
        let newPhotoData = await submitFile(req);
        console.log("new file", newPhotoData);

        //final json
        let photo = await addToJson(newPhotoData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(photo, null, 5));
    }
    
}
