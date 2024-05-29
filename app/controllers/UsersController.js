import usersData from "../data/usersData.json" assert { type: 'json' };
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;
import 'dotenv/config'

export default class UsersController{
    constructor(){
        this.usersData = [...usersData];
    }

    async encrypt(password){
        let encryptedPassword = await hash(password, 10);
        return encryptedPassword;
    }

    async decrypt(userPass, encrypted){
        let decrypted = await compare(userPass, encrypted);
        return decrypted;
    }

    async register(data){
        data = JSON.parse(data);
        let hasEmptyValue = false;
        for(const value of Object.values(data)){
            if(value == "" || value == null || value == undefined){
                hasEmptyValue = true;
            }
        }
        let emailExists = this.usersData.some(obj => obj.email === data.email);

        if(!hasEmptyValue && !emailExists){
            const encryptedPass = await this.encrypt(data.password);
            let newUser = {
                "id": Date.now(),
                "name": data.name,
                "lastName": data.lastName,
                "email": data.email,
                "confirmed": false,
                "password": encryptedPass,
            }

        }
    }

}