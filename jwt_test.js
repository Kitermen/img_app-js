import jsonwebtoken from 'jsonwebtoken';
import 'dotenv/config'
const { sign, verify } = jsonwebtoken;

console.log(process.env.APP_PORT);
const createToken = () => {
    let token = sign(
        {
            email: "aaa2@test.com",
            anyOtherData: "123"
        },
        process.env.APP_PORT,
        {
            expiresIn: "30m" // "1m", "1d", "24h"
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
    //createToken()
    verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCId6IkpXVCJ9.eyJlbWFpbCI6ImFhYTJAdGVzdC5jb20iLCJhbnlPdGhlckRhdGEiOiIxMjMiLCJpYXQiOjE3MTcwOTIwNjcsImV4cCI6MTcxNzA5Mzg2N30.HqNMLTmYrHzPwQ9Hq33Wri4YazJx_KxsBHE795QDxEU")
}

processToken()