import usersData from "../data/usersData.json" assert { type: 'json' };
import expTokens from "../data/expiredTokens.json" assert { type: 'json' };
import formidable from "formidable";
import { existsSync, promises as fsPromises } from "fs";
import { join } from "path";
//__dirname in ES6
import path from "path";
import { fileURLToPath } from 'url';

// import bcryptjs from 'bcryptjs';
// const { hash, compare } = bcryptjs;

import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

import 'dotenv/config'



export default class ProfilesController{
    constructor(){
        this.usersData = [...usersData];
        this.expTokens = [...expTokens];
        this.dirname = path.dirname(fileURLToPath(import.meta.url));
        this.usersFile = join(this.dirname, "../data/usersData.json");
        this.tokensFile = join(this.dirname, "../data/expiredTokens.json");
        this.unConfirmed = undefined;
    }

    async encrypt(password){
        let encryptedPassword = await hash(password, 10);
        return encryptedPassword;
    }

    async decrypt(userPass, encrypted){
        let decrypted = await compare(userPass, encrypted);
        return decrypted;
    }

    createToken(email, pass, exp){
        let token = sign(
            {
                email: email,
                anyOtherData: pass
            },
            process.env.SECRET_KEY,
            {
                expiresIn: exp // "1m", "1d", "24h"
            }
        )
        return token;
    }

    verifyToken(token){
        try{
            let decoded = verify(token, process.env.SECRET_KEY)
            return decoded;
        }
        catch(error){
            return { message: error.message };
        }
    }

    async getData(decoded){
        return new Promise(async (resolve, reject) => {
            try{
                console.log(decoded);
                const user = this.usersData.find(obj => obj.email == decoded.email)
                const profileData = {
                    "name": user.name,
                    "lastname": user.lastName,
                    "email": user.email
                }
                resolve(profileData);
            }
            catch(error){
                reject("An error occurred - get(Profile)Data:", error);
            }
        })
    }

    async updateData(newData, decoded){
        return new Promise(async (resolve, reject) => {
            try{
                newData = JSON.parse(newData);
                this.usersData.find(obj => {
                    if(obj.email == decoded.email){
                        obj.name = newData.name;
                        obj.lastName = newData.lastName;
                    }
                })
                
                if(!this.usersData.length) resolve("Nie znaleziono użytkownika w bazie")
                else{
                    await fsPromises.writeFile(this.usersFile, JSON.stringify(this.usersData), "utf-8");
                    resolve("Dane zostały zaaktualizowane!")
                }
            }
            catch(error){
                reject("An error occurred - update(Profile)Data:", error);
            }
        })
    }

    async profilePhoto(req){
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
                reject("An error occurred - updateProfilePic:", error);
            }
        })
    }

    async logout(token){
        return new Promise((resolve, reject) => {
            try{
                console.log(token);
                this.expTokens.push(token);                                                                                                           
                fsPromises.writeFile(this.tokensFile, JSON.stringify(this.expTokens), "utf-8");
                resolve(`Token: ${token} został dezaktywowany`);
            }                                   
            catch(error){
                reject("An error occurred - logout:", error);
            }
        })
    }
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbWVAZW1haWwucGwiLCJhbnlPdGhlckRhdGEiOiJwYXNzd29yZCIsImlhdCI6MTcxNzA4NjQxMywiZXhwIjoxNzE3MDg2NDczfQ.bAVF7pkwdhZHL1blUKMDV2qTR9uxgdKuPt21v7ooIBA"