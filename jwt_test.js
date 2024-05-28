import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'
const { sign, verify } = jsonwebtoken;

let token = "";
console.log(process.env.APP_PORT);
const createToken = () => {
    let token = sign(
        {
            email: "aaa2@test.com",
            anyOtherData: "123"
        },
        process.env.APP_PORT,
        {
            expiresIn: "30s" // "1m", "1d", "24h"
        }
    );
    console.log({ token: token });
}



const verifyToken = (token) => {
    try {
        let decoded = verify(token, process.env.APP_PORT)
        console.log({ decoded: decoded });
    }
    catch (ex) {
        console.log({ message: ex.message });
    }
}


const processToken = () => {
    createToken()
    verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFhYTJAdGVzdC5jb20iLCJhbnlPdGhlckRhdGEiOiIxMjMiLCJpYXQiOjE3MTY4OTgyMTQsImV4cCI6MTcxNjg5ODI0NH0.X3lZQqpIxVsvCCXxUM7NjoXEOyXFdukSefwRNYoW2Vo")
}

processToken()