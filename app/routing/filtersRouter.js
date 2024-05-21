import FiltersController from "../controllers/FiltersController.js";
import getRequestData from "../getRequestData.js";

const filtersController = new FiltersController;

const filtersRouter = async(req, res)=>{
    if(req.url.match(/\/api\/filters\/metadata\/([a-z0-9]+)/) && req.method == "GET"){
        try{
            const id = req.url.split("/")[4];
            const metadata = await filtersController.getMetadata(id);
            if(!metadata) throw new Error("photo & its metadata not found");
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(metadata, null, 5));
        }
        catch(error){
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error.message }));
        }
    }

    else if(req.url.match(/\/api\/filters/) && req.method == "PATCH"){
        try{
            const newData = await getRequestData(req);
            let thisPhoto = await filtersController.editPhoto(newData);
            //if(thisPhoto) throw new Error("not found, not filtered");
            console.log("damn", thisPhoto);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(thisPhoto, null, 5));
        }
        catch(error){
            console.log(error);
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: error }));
        }
    }

    // else if(req.url.match(/\/api\/photos\/([a-z0-9]+)/) && req.method == "DELETE"){
    //     try{
    //         const id = req.url.split("/")[3];
    //         let deletedPhoto = await jsonController.delPhotoById(id);
    //         if(!deletedPhoto) throw new Error(`photo with id ${id}x not deleted`);
    //         res.writeHead(200, { 'Content-Type': 'application/json' });
    //         res.end(JSON.stringify(`photo with id ${id} deleted`, null, 5));
    //     }
    //     catch(error){
    //         res.writeHead(404, { 'Content-Type': 'application/json' });
    //         res.end(JSON.stringify({ message: error.message }));
    //     }
    // }
}

export default filtersRouter;


