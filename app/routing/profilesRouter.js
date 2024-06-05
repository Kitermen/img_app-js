import ProfilesController from "../controllers/ProfilesController.js";
import getRequestData from "../getRequestData.js";

const profilesController = new ProfilesController;


const profilesRouter = async(req, res, decoded)=>{
    if(req.url.match(/\/api\/profiles/) && req.method == "GET"){
        const profileData = await profilesController.getData(decoded);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(profileData, null, 5));
    }

    else if(req.url.match(/\/api\/profiles/) && req.method == "PATCH"){
        const newData = await getRequestData(req);
        console.log(newData);
        //console.log(decoded);
        const updateRes = await profilesController.updateData(newData, decoded);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updateRes, null, 5));
    }

    // else if(req.url.match(/\/api\/user\/login/) && req.method == "POST"){
    //     const loginData = await getRequestData(req);
    //     const token = await usersController.login(loginData);
    //     res.setHeader('Authorization', 'Bearer '+ token);
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(token, null, 5));
    // }
}

export default profilesRouter;

