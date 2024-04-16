import { rejects } from "assert";
import formidable from "formidable";
import * as fs from "fs";
import { existsSync } from "fs";
import { join, resolve } from "path";

const fileOperations = {
    submitFile: async (req)=>{
        return new Promise((resolve, reject)=>{
            try{
                let form = formidable({});
                form.uploadDir = "./uploads/";
                form.keepExtensions = true;
                form.parse(req, async (err, fields, files)=>{
                    //fields - nazwa albumu
                    if(err)resolve(err.message);
                    else{
                        console.log(fields);
                        console.log(files);
                        let setFolderName = fields.album.length == 0 ? "unknown" : fields.album;
                        let folderPath = join("./upload/", setFolderName);
                        if(!existsSync(folderPath)){
                            await fs.Promises.mkdir(folderPath)
                        }
                        let fileName = files.file.path.split("\\");
                        let fullFilePath = join("./upload/", files.album, fileName);

                        fs.rename(files.file.path, form.uploadDir + "/", + setFolderName);

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

export default fileOperations;