import photosData from "../data/photosData.json" assert { type: 'json' };
import sharp from "sharp";

export default class FiltersController {
    constructor(){
        this.currentPhotos = [...photosData];
    }

    async getMetadata(id){
        return new Promise(async (resolve, reject) => {
            try{
                //console.log("WESZLO");
                id = parseInt(id)

                let findPhoto = this.currentPhotos.find(photo => photo.id == id);
                console.log(findPhoto);
                
                if(findPhoto.url){
                    let meta = await sharp(findPhoto.url)
                        .metadata()
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
}