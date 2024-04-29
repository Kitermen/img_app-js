import JsonController from "./jsonController.js";
import FileController from "./fileController.js";
import getRequestData from "./getRequestData.js";
// import fileOperations from "./fileController.js";


const jsonController = new JsonController;
const fileController = new FileController;


const imageRouter = async(req, res)=>{
    //      alle Photos zeigen
    if(req.url == "/api/photos" && req.method == "GET"){
        const photos = await jsonController.getPhotos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(photos, null, 5));
    }

    //      ein Foto nach ID zeigen
    else if(req.url.match(/\/api\/photos\/([a-z0-9]+)/) && req.method == "GET"){
        try{
            const id = req.url.split("/")[3];
            let thisPhoto = await jsonController.getPhotoById(id);
            if(!thisPhoto) throw new Error("not found");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thisPhoto, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    //      ein Photo nach ID löschen
    else if(req.url.match(/\/api\/photos\/([a-z0-9]+)/) && req.method == "DELETE"){
        try{
            const id = req.url.split("/")[3];
            let deletedPhoto = await jsonController.delPhotoById(id);
            if(!deletedPhoto) throw new Error(`photo with id ${id}x not deleted`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(`photo with id ${id} deleted`, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    //      ein Photo nach ID aktualisieren
    else if(req.method == "PATCH"){
        try{
            const newData = await getRequestData(req);
            //console.log(newData);
            let chgdData = await jsonController.editPhotoById(newData);
            console.log(chgdData);
            if(!chgdData) throw new Error("not found not changed");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(chgdData, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.url == "/api/photos" && req.method == "POST"){
        //formidable data
        let newPhotoData = await fileController.submitFile(req);
        console.log(newPhotoData);
        let addedPhoto = await jsonController.addToJson(newPhotoData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(addedPhoto, null, 5));
    }
    
}

export default imageRouter;
