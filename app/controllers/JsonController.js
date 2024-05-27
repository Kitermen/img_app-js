import photosData from "../data/photosData.json" assert { type: 'json' };
import { promises as fsPromises } from "fs";
import { join } from "path";
//__dirname in ES6
import path from "path";
import { fileURLToPath } from 'url';


export default class JsonController {
    constructor() {
        this.currentPhotos = [...photosData];
        this.dirname = path.dirname(fileURLToPath(import.meta.url));
    }

    idFilter(id){
        return this.currentPhotos.filter(photo=>photo.id == id);
    }


    async getPhotos(){
        return this.currentPhotos;
    }

    async getPhotoById(id){
        let photoData = this.idFilter(id);
        return photoData.length == 1 ? photoData : null;
    }

    async delPhotoById(id){
        let photoData = this.idFilter(id);
        console.log(photoData);
        if(!photoData.length) return null;
        let filteredJson = this.currentPhotos.filter(photo=>{return photo.id != id});
        return filteredJson;
    }

    async editPhotoById(data){
        const newData = JSON.parse(data);
        const id = newData.id;
        let changedData, photoData = this.idFilter(id);
        if(!photoData.length) return null;
        this.currentPhotos.filter(photo=>{
            if(photo.id == id){
                photo.lastChange = `zmienione ${photo.history.length} raz`
                const changesInfo = {
                    "status": `zmienione ${photo.history.length} raz`,
                    "timestamp": Date.now(),
                }
                photo.history.unshift(changesInfo);
                changedData = photo;
            }
        })
        return changedData;
    }

    async addToJson(data) {
        let photoData = {
            "id": Date.now(),
            "album": data.fields,
            "originalName": data.originalName,
            "url": data.filePath,
            "lastChange": "original",
            "history": [
                {
                    "status": "original",
                    "timestamp": Date.now()
                }
            ]
        }

        //const filePath = "../data/photosData.json";

        try {
            const __dirname = this.dirname;
            const jsonPath = join(__dirname, "../data/photosData.json");
            
            const photosData = await fsPromises.readFile(jsonPath, "utf-8");
            
            let jsonData = JSON.parse(photosData);
            jsonData = JSON.parse(jsonData)
            console.log(jsonData);
            jsonData.push(photoData);

            const photosStr = JSON.stringify(photosData);
            //console.log(photosStr);
            await fsPromises.writeFile(jsonPath, photosStr, "utf-8")

        } catch(error){
            console.error("An error occurred:", error.message);
        }
        return photoData;
    }
}