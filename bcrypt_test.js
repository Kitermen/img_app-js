import 'dotenv/config'
import bcryptjs from 'bcryptjs';
const { hash, compare } = bcryptjs;

const pass = "moje tajne hasło"

// const encryptPass = async (password) => {

//     let encryptedPassword = await hash(password, 10);
//     console.log({ encryptedPassword: encryptedPassword });
// }

// await encryptPass(pass)

const decryptPass = async (userpass, encrypted) => {

    let decrypted = await compare(userpass, encrypted)
    console.log(decrypted);

}

await decryptPass(pass, "$2a$10$33UPprIq.fdYVVZG87ydRuIQUsdS7SOMgsQn3ES3ySYPfiS5Chnau")