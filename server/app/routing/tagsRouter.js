import getRequestData from "../getRequestData.js";
import TagsController from "../controllers/TagsController.js";


const tagsController = new TagsController;


const tagRouter = async(req, res)=>{
    if(req.url == "/api/tags/raw" && req.method == "GET"){
        const rawTags = await tagsController.getRawTags();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(rawTags, null, 5));
    }

    else if(req.url == "/api/tags" && req.method == "GET"){
        const tags = await tagsController.getTags();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(tags, null, 5));
    }

    else if(req.url.match(/\/api\/tags\/photos\/([a-z0-9]+)/) && req.method == "GET"){
        try{
            const id = req.url.split("/")[4];
            let thisPhotoTags = await tagsController.getPhotoTags(id);
            if(!thisPhotoTags) throw new Error(`not found`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thisPhotoTags, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.url.match(/\/api\/tags\/([a-z0-9]+)/) && req.method == "GET"){
        try{
            const id = req.url.split("/")[3];
            let thisTag = await tagsController.getTagById(id);
            if(!thisTag) throw new Error("not found");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thisTag, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.method == "POST"){
        try{
            const name = await getRequestData(req);
            let addedTag = await tagsController.addTag(name);
            if(!addedTag) throw new Error("Tag z podaną nazwą już istnieje!");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(addedTag, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.url.match(/\/api\/tags\/photos\/mass/) && req.method == "PATCH"){
        try{
            const id = await getRequestData(req);
            let thisTag = await tagsController.updateByTags(id);
            if(!thisTag) throw new Error(`Nie udało się zaaktualizować zdjęcia kilkoma tagmi`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thisTag, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.url.match(/\/api\/tags\/photos/) && req.method == "PATCH"){
        try{
            const id = await getRequestData(req);
            let thisTag = await tagsController.updateByTag(id);
            if(!thisTag) throw new Error(`could not update such a photo with a tag`);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thisTag, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }
}

export default tagRouter;