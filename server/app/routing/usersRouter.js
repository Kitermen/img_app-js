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
        const confirmRes = await usersController.confirm(token);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(confirmRes, null, 5));
    }

    else if(req.url.match(/\/api\/user\/login/) && req.method == "POST"){
        const loginData = await getRequestData(req);
        const token = await usersController.login(loginData);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(token, null, 5));
    }
}

export default usersRouter;


