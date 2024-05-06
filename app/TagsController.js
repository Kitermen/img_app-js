import tagsData from "./data/tagsData.json" assert { type: 'json' };
import photosData from "./data/photosData.json" assert { type: 'json' };

export default class TagsController {
    constructor(){
        this.currentPhotos = [...photosData];
        this.currentTags = [...tagsData];
    }

    formatTags() {
        let tags = this.currentTags.map((tag, i) => {
            let obj = {
                "id": i,
                "name": tag,
                "popularity": Math.floor(Math.random() * 900) + 100
            };
            return obj;
        });
        return tags;
    }


    async getRawTags(){
        return this.currentTags;
    }

    async getTags(){
        let tags = this.formatTags();
        return tags;
    }

    async getTagById(id){
        let tags = this.formatTags();
        let foundTag = tags.find(tag => tag.id == id);
        return foundTag;
    }

    async addTag(name){
        name = JSON.parse(name).name; 
        const tagName = `#${name}`;
        if(!this.currentTags.some(tag => tag == tagName)){
            const obj = {
                "id": this.currentTags.length + 1,
                "name": tagName,
                "popularity": Math.floor(Math.random() * 900) + 100
            }
            //this.currentTags.push(obj);
            return obj;
        }
        return null;
    }

    async updateByTag(id){
        id = JSON.parse(id).id; 
        const updatedPhoto = this.currentPhotos.find(photo => {
            if(photo.id === id){
                photo.tags = [{ "name": "#nowytagdlazdjęcia" }];
                return true;
            }
            return false;
        })
        return updatedPhoto;
    }

    async updateByTags(id){
        id = JSON.parse(id).id; 
        const updatedPhoto = this.currentPhotos.find(photo => {
            if(photo.id === id){
                photo.tags = [
                    { "name": "#nowytagdlazdjęcia" },
                    { "name": "#nowytag1dlazdjęcia" },
                    { "name": "#nowytag2dlazdjęcia" },
                    { "name": "#nowytag3dlazdjęcia" },
                ]
                return true;
            }
            return false;
        })
        return updatedPhoto;
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

}