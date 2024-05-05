import http from 'http';
import imageRouter from './app/routing/imageRouter.js';
import tagRouter from "./app/routing/tagRouter.js";

const PORT = process.env.PORT || 3000;

http.createServer(async (req, res) => {

    // images
    if (req.url.search("/api/photos")!= -1) {
       await imageRouter(req, res);
    }

    // tags
    else if (req.url.search("/api/tags")!= -1) {
       await tagRouter(req, res);
    }

}).listen(PORT, () => console.log("Listening on 3000"));
// lub .listen(3000, () => console.log("listen on 3000"))