import photosData from "../data/photosData.json" assert { type: 'json' };
import { join } from "path";
import sharp from "sharp";

export default class FiltersController {
    constructor(){
        this.currentPhotos = [...photosData];
    }

    getPhotoPath(id){
        let photo = this.currentPhotos.find(photo => photo.id == id);
        return photo;
    }

    async getMetadata(id){
        return new Promise(async (resolve, reject) => {
            try{
                id = parseInt(id);
                let findPhoto = this.getPhotoPath(id);
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
        return new Promise(async (resolve, reject) => {
            try{
                data = JSON.parse(data);
                const id = data.id;
                const myFilter = data.lastChange;

                const photo = this.getPhotoPath(id);
                const photoPath = join("uploads", photo.album, "input-rotated.jpg");
                
                if(myFilter){
                    switch (myFilter){
                        case "rotate":{
                            let meta = await sharp(photo.url).rotate(90).toFile(photoPath);
                            resolve(meta);
                        }
                        break;
                        case "resize":{
                            let meta = await sharp(photoPath).resize({width: 150,height: 100}).toFile("input-resized.jpg");
                            resolve(meta);
                        }
                        break;
                        case "reformat":{
                            let meta = await sharp(photoPath).toFormat("png").toFile("input-reformatted.png");
                            resolve(meta);
                        }
                        break;
                        case "crop":{
                            let meta = await sharp(photoPath).extract({ width: 200, height: 200, left: 20, top: 20 }).toFile("input-cropped.jpg");
                            resolve(meta);
                        }
                        break;
                        case "grayscale":{
                            let meta = await sharp(photoPath).grayscale().toFile("input-grayscale.jpg");
                            resolve(meta);
                        }
                        break;
                        case "flip":
                            meta = await sharp(findPhoto.url).fil(90).toFile("input-rotated.jpg");
                            resolve(meta)
                        break;
                        case "flop":
                            meta = await sharp(findPhoto.url).fil(90).toFile("input-rotated.jpg");
                            resolve(meta)
                        break;
                        case "negate":
                            meta = await sharp(findPhoto.url).fil(90).toFile("input-rotated.jpg");
                            resolve(meta)
                        break;
                        case "tint":
                            meta = await sharp(findPhoto.url).fil(90).toFile("input-rotated.jpg");
                            resolve(meta)
                        break;
                    }
                    let meta = await sharp(findPhoto.url).fil(90).toFile("input-rotated.jpg");
                    resolve(meta)
                }
                else{
                    resolve("filter not found")
                }
            }
            catch(error){
                reject("not found, not filtered")
            }
        })

    }
}