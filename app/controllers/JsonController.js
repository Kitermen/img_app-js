import photosData from "../data/photosData.json" assert { type: 'json' };

export default class JsonController {
    constructor() {
        this.currentPhotos = [...photosData];
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
        return photoData;
    }

    // static async getPhotos(){
    //     const jsonController = new JsonController();
    //     return await jsonController.getPhotos();
    // }
}