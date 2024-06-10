import ProfilesController from "../controllers/ProfilesController.js";
import JsonController from "../controllers/JsonController.js";


const jsonController = new JsonController;
const profilesController = new ProfilesController;


const profilesRouter = async(req, res, decoded, token)=>{
    if(req.url.match(/\/api\/profiles\/logout/) && req.method == "GET"){
        let expiredToken = await profilesController.logout(token);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(expiredToken, null, 5));
    }

    else if(req.url.match(/\/api\/profiles/) && req.method == "GET"){
        const profileData = await profilesController.getData(decoded);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(profileData, null, 5));
    }

    else if(req.url.match(/\/api\/profiles/) && req.method == "PATCH"){
        const newData = await getRequestData(req);
        const updateRes = await profilesController.updateData(newData, decoded);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateRes, null, 5));
    }

    else if(req.url.match(/\/api\/profiles/) && req.method == "POST"){
        let newPhotoData = await profilesController.profilePhoto(req);
        let addedPhoto = await jsonController.addToJson(newPhotoData);
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(addedPhoto, null, 5));
    }
}

export default profilesRouter;

