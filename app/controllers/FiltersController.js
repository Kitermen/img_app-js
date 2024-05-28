import photosData from "../data/photosData.json" assert { type: 'json' };
import JsonController from "../controllers/JsonController.js";
import { readFileSync, promises as fsPromises } from "fs";
import { join } from "path";
import sharp from "sharp";
//__dirname in ES6
import path from "path";
import { fileURLToPath } from 'url';

const jsonController = new JsonController;

export default class FiltersController{
    constructor(){
        this.currentPhotos = [...photosData];
        this.dirname = path.dirname(fileURLToPath(import.meta.url));
        this.jsonFile = join(this.dirname, "../data/photosData.json");
    }

    getPhoto(id){
        let photo = this.currentPhotos.find(photo => photo.id == id);
        return photo;
    }

    async getMetadata(id){
        return new Promise(async (resolve, reject) => {
            try{
                id = parseInt(id);
                const findPhoto = this.getPhoto(id);
    
                if(findPhoto != undefined){
                    let meta = await sharp(findPhoto.url).metadata();
                    resolve(meta);
                }
                else{
                    resolve("photo & its url not found");
                }
            }
            catch(error){
                reject("An error occurred:", error)
            }
        })
    }

    async editPhoto(data){
        return new Promise(async (resolve, reject) => {
            try{
                data = JSON.parse(data);
                const id = data.id;
                const myFilter = data.lastChange;
    
                const photo = this.getPhoto(id);
            
                const savePath = join("uploads", photo.album, `${(photo.url.split("\\")[2]).split(".")[0]}-${myFilter}.jpg`);
                
                jsonController.editPhotoById(photo, myFilter, savePath);
                
                let meta = "";
                if(myFilter){
                    switch (myFilter){
                        case "rotate":{
                            meta = await sharp(photo.url).rotate(90).toFile(savePath);
                        }
                        break;
                        case "resize":{
                            meta = await sharp(photo.url).resize({width: 150, height: 100}).toFile(savePath);
                        }
                        break;
                        case "reformat":{
                            meta = await sharp(photo.url).toFormat("png").toFile(savePath);
                        }
                        break;
                        case "crop":{
                            meta = await sharp(photo.url).extract({ width: 200, height: 200, left: 20, top: 20 }).toFile(savePath);
                        }
                        break;
                        case "grayscale":{
                            meta = await sharp(photo.url).grayscale().toFile(savePath);
                        }
                        break;
                        case "flip":{
                            meta = await sharp(photo.url).flip().toFile(savePath);
                        }
                        break;
                        case "flop":{
                            meta = await sharp(photo.url).flop().toFile(savePath);
                        }
                        break;
                        case "negate":{
                            meta = await sharp(photo.url).negate().toFile(savePath);
                        }
                        break;
                        case "tint":{
                            meta = await sharp(photo.url).tint({r:255,g:0,b:0}).toFile(savePath);
                        }
                        break;
                    }

                    resolve(meta);
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

    async getOriPhoto(id){
        return new Promise(async (resolve, reject) => {
            try{
       
                const photo = this.getPhoto(id);
            
                const photoPath = join(this.dirname, `../../uploads/${photo.album}/${photo.url.split("\\")[2]}`);
           
                const photoFile = await fsPromises.readFile(photoPath);
                resolve(photoFile);
            }
            catch(error){
                reject("An error occurred:", error)
            }
        })
    }

    async getFilteredPhoto(id, filter){
        return new Promise(async (resolve, reject) => {
            try{
                const photo = this.getPhoto(id);
           
                const filteredPhoto = photo.history.find(chg => chg.status == filter);

                const photoPath = join(this.dirname, `../../uploads/${photo.album}/${filteredPhoto.url.split("\\")[2]}`);
             
                const photoFile = await fsPromises.readFile(photoPath);
                resolve(photoFile);
            }
            catch(error){
                reject("An error occurred:", error)
            }
        })
    }
}