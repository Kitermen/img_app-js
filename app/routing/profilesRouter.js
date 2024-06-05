import ProfilesController from "../controllers/ProfilesController.js";
import getRequestData from "../getRequestData.js";

const profilesController = new ProfilesController;


const profilesRouter = async(req, res, decoded)=>{
    if(req.url.match(/\/api\/profiles/) && req.method == "GET"){
        // if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        //     // czytam dane z nagłowka
        //     let token = req.headers.authorization.split(" ")[1]
        //     console.log(token)
        // }
        const profileData = await profilesController.getData(decoded);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(profileData, null, 5));
    }

    // else if(req.url.match(/\/api\/user\/confirm\/eyJ[A-Za-z0-9-_]+\.eyJ[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/]*/) && req.method == "GET"){
    //     const token = req.url.split("/")[4];
    //     //console.log(token);
    //     const confirmRes = await usersController.confirm(token);
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(confirmRes, null, 5));
    // }

    // else if(req.url.match(/\/api\/user\/login/) && req.method == "POST"){
    //     const loginData = await getRequestData(req);
    //     const token = await usersController.login(loginData);
    //     res.setHeader('Authorization', 'Bearer '+ token);
    //     res.writeHead(200, { 'Content-Type': 'application/json' });
    //     res.end(JSON.stringify(token, null, 5));
    // }
}

export default profilesRouter;

