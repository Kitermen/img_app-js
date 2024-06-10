import formidable from "formidable";
import { existsSync, promises as fsPromises } from "fs";
import { join } from "path";

export default class JsonController{

    async submitFile(req){
        return new Promise((resolve, reject) => {
            try{
                let form = formidable({});
                form.uploadDir = "./uploads/";
                form.keepExtensions = true;
                form.parse(req, async (err, fields, files) => {
                    if(err)resolve(err.message);
                    else{
                        let setFolderName = fields.album.length == 0 ? "unknown" : fields.album;
                        let folderPath = join("./uploads/", setFolderName);
                        if(!existsSync(folderPath)){
                            await fsPromises.mkdir(folderPath);
                        }
                        
                        let fileName = files.file.path.split("\\");

                        let fullFilePath = join("./uploads", setFolderName, fileName[1]);
                        await fsPromises.rename(files.file.path, fullFilePath);
                    
                        let fileData = {
                            fields: fields,
                            filePath: fullFilePath,
                            originalName: files.file.name,
                            lastModifiedDate: files.file.lastModifiedDate,
                        }

                        resolve(fileData);
                    }
                })
            }
            catch(error){
                reject(error);
            }
        })
    }
}
