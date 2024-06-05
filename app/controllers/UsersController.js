import usersData from "../data/usersData.json" assert { type: 'json' };
import { promises as fsPromises } from "fs";
import { join } from "path";
//__dirname in ES6
import path from "path";
import { fileURLToPath } from 'url';

import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;

import jsonwebtoken from 'jsonwebtoken';
const { sign, verify } = jsonwebtoken;

import 'dotenv/config'



export default class UsersController{
    constructor(){
        this.usersData = [...usersData];
        this.dirname = path.dirname(fileURLToPath(import.meta.url));
        this.jsonFile = join(this.dirname, "../data/usersData.json");
        this.unConfirmed = undefined;
    }

    async encrypt(password){
        let encryptedPassword = await hash(password, 10);
        return encryptedPassword;
    }

    async decrypt(userPass, encrypted){
        let decrypted = await compare(userPass, encrypted);
        console.log("a");
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

    async register(data){
        return new Promise(async (resolve, reject) => {
            try{ 
                data = JSON.parse(data);
                let hasEmptyValue = false;
                for(const value of Object.values(data)){
                    if(value == "" || value == null || value == undefined){
                        hasEmptyValue = true;
                    }
                }
                let emailExists = this.usersData.some(obj => obj.email === data.email);

                if(emailExists) resolve("User z takim adresem email już istnieje")

                if(!hasEmptyValue && !emailExists){
                    let token = this.createToken(data.email, data.password, "60m");

                    const encryptedPass = await this.encrypt(data.password);

                    let newUser = {
                        "id": Date.now(),
                        "name": data.name,
                        "lastName": data.lastName,
                        "email": data.email,
                        "confirmed": false,
                        "password": encryptedPass,
                    }
                    this.usersData.push(newUser);

                    await fsPromises.writeFile(this.jsonFile, JSON.stringify(this.usersData), "utf-8");
                  
                    resolve({ user: newUser, token: token });
                }
            } 
            catch(error){
                reject("An error occurred - register:", error);
            }
        })
    }

    async confirm(token){
        return new Promise(async (resolve, reject) => {
            try{ 
                const decoded = this.verifyToken(token);
                if(decoded.hasOwnProperty("message")){
                    resolve("Problem z tokenem podczas potwierdzania konta!")
                }
                else{
                    this.usersData.find(obj => {
                        if(obj.email == decoded.email){
                            obj.confirmed = true;
                        }
                    })
                    await fsPromises.writeFile(this.jsonFile, JSON.stringify(this.usersData), "utf-8");
                    resolve("Konto użytkownika potwierdzone!")
                }
            }
            catch(error){
                reject("An error occurred - confirm:", error);
            }
        })
    }

    async login(passes){
        return new Promise(async (resolve, reject) => {
            try{
                passes = JSON.parse(passes);
                const user = this.usersData.find(obj => obj.email == passes.email && obj.confirmed == true)

                if(user){
                    const encrypted = await this.decrypt(passes.password, user.password);
                    
                    if(encrypted){
                        let token = this.createToken(passes.email, passes.password, "5m");
                        resolve(token);
                    }
                    else resolve("Podane hasło jest bbbłędne!");
                }
                else resolve("Konto z takim mailem nie istnieje bądź nie jest potwirdzone!");
                
            }
            catch(error){
                reject("An error occurred - login:", error);
            }
        })
    }
}

//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5hbWVAZW1haWwucGwiLCJhbnlPdGhlckRhdGEiOiJwYXNzd29yZCIsImlhdCI6MTcxNzA4NjQxMywiZXhwIjoxNzE3MDg2NDczfQ.bAVF7pkwdhZHL1blUKMDV2qTR9uxgdKuPt21v7ooIBA"