import photosData from "../data/photosData.json" assert { type: 'json' };
import { join } from "path";
import sharp from "sharp";
//__dirname in ES6
import path from "path";
import { fileURLToPath } from 'url';


export default class FiltersController{
    constructor(){
        this.currentPhotos = [...photosData];
        this.dirname = path.dirname(fileURLToPath(import.meta.url));
        this.jsonFile = join(this.dirname, "../data/photosData.json");
    }

    getsavePath(id){
        let photo = this.currentPhotos.find(photo => photo.id == id);
        return photo;
    }

    async getMetadata(id){
        return new Promise(async (resolve, reject) => {
            try{
                id = parseInt(id);
                let findPhoto = this.getsavePath(id);
                if(findPhoto.url){
                    let meta = await sharp(findPhoto.url).metadata()
                    resolve(meta)
                }
                else{
                    resolve("url_not_found")
                }
            }
            catch(err){
                reject(err.mesage)
            }
        })
    }

    async editPhoto(data){
        //console.log(this.currentPhotos);
        return new Promise(async (resolve, reject) => {
            try{
                data = JSON.parse(data);
                const id = data.id;
                const myFilter = data.lastChange;
                console.log("FILTR", myFilter);
                const photo = this.getsavePath(id);
                console.log("HMHMHMHM",photo);
                const savePath = join("uploads", photo.album, `input-rotated.jpg`);
                console.log(savePath);
                console.log("FILTR", myFilter);
                //let meta = "";
                if(myFilter){
                    switch (myFilter){
                        case "rotate":{
                            console.log("WESZLOOO");
                            let meta = await sharp(photo.url).rotate(90).toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "resize":{
                            let meta = await sharp(photo.url).resize({width: 150, height: 100}).toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "reformat":{
                            let meta = await sharp(photo.url).toFormat("png").toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "crop":{
                            let meta = await sharp(photo.url).extract({ width: 200, height: 200, left: 20, top: 20 }).toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "grayscale":{
                            let meta = await sharp(photo.url).grayscale().toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "flip":{
                            let meta = await sharp(photo.url).flip().toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "flop":{
                            let meta = await sharp(photo.url).flop().toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "negate":{
                            let meta = await sharp(photo.url).negate().toFile(savePath);
                            resolve(meta);
                        }
                        break;
                        case "tint":{
                            let meta = await sharp(photo.url).tint({r:255,g:0,b:0}).toFile(savePath);
                            resolve(meta);
                        }
                        break;
                    }
                }
                else{
                    resolve("filter not found")
                }
            }
            catch(error){
                reject("An error occurred:", error)
            }
        })

    }
}