import UsersController from "../controllers/UsersController.js";
import getRequestData from "../getRequestData.js";

const usersController = new UsersController;


const usersRouter = async(req, res)=>{
    if(req.url.match(/\/api\/user\/register/) && req.method == "POST"){
        const userData = await getRequestData(req);
        const setupUser = await usersController.register(userData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(setupUser, null, 5));
    }

    else if(req.url.match(/\/api\/user\/confirm\/eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/) && req.method == "GET"){
        const token = req.url.split("/")[4];
        //console.log(token);
        const filterPhoto = await usersController.confirm(token);
        return;
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(filterPhoto, null, 5));
    }

    // else if(req.url.match(/\/api\/filters\/getimage\/([a-z0-9]+)\/filter\/([a-z0-9]+)/) && req.method == "GET"){
    //     const id = req.url.split("/")[4];
    //     const filter = req.url.split("/")[6];
    //     let photo = await filtersController.getFilteredPhoto(id, filter);
    //     res.setHeader('Content-Type', `image/jpeg`);
    //     res.write(photo);
    //     res.end();
    // }

    // else if(req.url.match(/\/api\/filters\/getimage\/([a-z0-9]+)/) && req.method == "GET"){
    //     const id = req.url.split("/")[4];
    //     let photo = await filtersController.getOriPhoto(id);
    //     res.setHeader('Content-Type', `image/jpeg`);
    //     res.write(photo);
    //     res.end();
    // }
}

export default usersRouter;


