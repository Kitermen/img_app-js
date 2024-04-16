import { photos } from "./model.js";

export default class JsonController {
    constructor() {
        this.currentPhotos = [...photos];
    }
}