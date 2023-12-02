const {v4} = require("uuid");
const { faker } = require("@faker-js/faker");
const fs = require("node:fs");
const fsasync = require("node:fs/promises");
const path = require('path');
const { validateHeaderValue } = require("node:http");

const loadDataPool = async () => {
    const datapoolPath = process.env.DATAPOOL_PATH;
    if (!fs.existsSync(datapoolPath) || !fs.existsSync(datapoolPath)) {
        console.log("Datapool file does not exist.")
        return [];
    }

    let data = await fsasync.readFile(datapoolPath);
    const buff = Buffer.from(data);
    const d = JSON.parse(buff.toString());
    
    const validData = [];
    const invalidData = [];
    const ramdom = [];

    for (const item of d){
        const validItem = {};
        const invalidItem = {};
        const randomItem = {};
        for (const [key,value] of Object.entries(item)){
            if (key.includes("valid")){
                validItem[key.substring(key.indexOf("_")+1, key.length)] = value
            }
            if (key.includes("ilegal")){
                invalidItem[key.substring(key.indexOf("_")+1, key.length)] = value
            }
            else if (key.includes("random")){
                randomItem[key.substring(key.indexOf("_")+1, key.length)] = value
            }
        }
        validData.push(validItem)
        invalidData.push(invalidItem)
        ramdom.push(randomItem)
    }

    
    
    return {
        validData,
        invalidData,
        ramdom
    };
}

exports.loadDataPool = loadDataPool;