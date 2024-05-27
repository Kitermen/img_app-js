import photosData from "../data/photosData.json" assert { type: 'json' };
import { promises as fsPromises } from "fs";
import { join } from "path";
//__dirname in ES6
import path from "path";
import { fileURLToPath } from 'url';


export default class JsonController{
    constructor(){
        this.currentPhotos = [...photosData];
        this.dirname = path.dirname(fileURLToPath(import.meta.url));
        this.jsonFile = join(this.dirname, "../data/photosData.json");

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
        let filteredJson = this.currentPhotos.filter(photo => {return photo.id != id});
        return filteredJson;
    }

    async editPhotoById(editedPhoto, filter, path){
        this.currentPhotos.find(obj => {
            if(obj.id == editedPhoto.id){
                obj.lastChange = filter
                const changesInfo = {
                    "status": filter,
                    "timestamp": Date.now(),
                    "url": path
                }
                obj.history.push(changesInfo);
            }
        })

        await fsPromises.writeFile(this.jsonFile, JSON.stringify(this.currentPhotos), "utf-8");
    }

    async addToJson(data) {
        let photoData = {
            "id": Date.now(),
            "album": data.fields.album,
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

        try{        
            const photosData = await fsPromises.readFile(this.jsonFile, "utf-8");
            
            let jsonData = JSON.parse(photosData);
            jsonData.push(photoData)
            
            await fsPromises.writeFile(this.jsonFile, JSON.stringify(jsonData), "utf-8")

        } catch(error){
            console.error("An error occurred:", error.message);
        }
        return photoData;
    }
}