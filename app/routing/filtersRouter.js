import FiltersController from "../controllers/FiltersController.js";
import JsonController from "../controllers/JsonController.js";
import getRequestData from "../getRequestData.js";

const filtersController = new FiltersController;

const filtersRouter = async(req, res)=>{
    if(req.url.match(/\/api\/filters\/metadata\/([a-z0-9]+)/) && req.method == "GET"){
        const id = req.url.split("/")[4];
        const metadata = await filtersController.getMetadata(id);
        if(!metadata) throw new Error("photo & its metadata not found");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(metadata, null, 5));
    }

    else if(req.url.match(/\/api\/filters/) && req.method == "PATCH"){
        const newData = await getRequestData(req);
        const filterPhoto = await filtersController.editPhoto(newData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filterPhoto, null, 5));
    }

    else if(req.url.match(/\/api\/filters\/getimage\/([a-z0-9]+)/) && req.method == "GET"){
        const id = req.url.split("/")[4];
        let photo = await filtersController.getOriPhoto(id);
        res.setHeader('Content-Type', `image/jpeg`);
        res.write(photo);
        res.end();
        
        
    }
}

export default filtersRouter;


