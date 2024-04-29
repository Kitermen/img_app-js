import getRequestData from "./getRequestData.js";
import TagsController from "./TagsController.js";
import photosData from "./data/photosData.json" assert { type: 'json' };


const tagsController = new TagsController;


const imageRouter = async(req, res)=>{
    if(req.url == "/api/tags/raw" && req.method == "GET"){
        const photos = await jsonController.getPhotos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(photos, null, 5));
    }

    else if(req.url == "/api/tags" && req.method == "GET"){
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

    else if(req.url.match(/\/api\/tags\/([a-z0-9]+)/) && req.method == "GET"){
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


}