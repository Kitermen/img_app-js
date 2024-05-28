import UsersController from "../controllers/UsersController.js";
import getRequestData from "../getRequestData.js";

const usersController = new UsersController;

const usersRouter = async(req, res)=>{
    if(req.url.match(/\/api\/user\/register/) && req.method == "POST"){
        const userData = await getRequestData(req);
        const getValidLink = await usersController.register(userData);
        return;
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

    else if(req.url.match(/\/api\/filters\/getimage\/([a-z0-9]+)\/filter\/([a-z0-9]+)/) && req.method == "GET"){
        const id = req.url.split("/")[4];
        const filter = req.url.split("/")[6];
        let photo = await filtersController.getFilteredPhoto(id, filter);
        res.setHeader('Content-Type', `image/jpeg`);
        res.write(photo);
        res.end();
    }

    else if(req.url.match(/\/api\/filters\/getimage\/([a-z0-9]+)/) && req.method == "GET"){
        const id = req.url.split("/")[4];
        let photo = await filtersController.getOriPhoto(id);
        res.setHeader('Content-Type', `image/jpeg`);
        res.write(photo);
        res.end();
    }
}

export default usersRouter;


