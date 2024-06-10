import axios from "axios"

const get = async (url) => {
    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.get(url)
                console.log("axios", response.data);
                resolve(response.data)
            } catch (err) {
                console.log(err);
                reject(err)
            }
        }, 500 + Math.random() * 1000);
    })
}

const post = async (url, object, header) => {
//url - url
//obj - dane (getRequestData)
//header - application/json
    return new Promise(async (resolve, reject) => {

        setTimeout(async () => {
            try {
                console.log(object);
                const response = await axios.post(url, object, header)
                //console.log("axios", response.data);
                resolve(response.data)
            } 
            catch (err) {
                reject(err)
            }

        }, 1000);

    })
}


export { get, post };