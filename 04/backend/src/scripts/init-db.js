/**
 * 运行方式 npm run init-db 。初始化数据库，把 species.json 里的数据导入 MongoDB
 * init-db.js 就是一个搬运工脚本，运行一次，把 json 里的数据全搬进 MongoDB：                           
                                          
  // init-db.js 做了三件事：                                                                          
                                                                                                      
  // 1. 连接数据库                                                                                    
  await mongoose.connect(process.env.DB_URL);                                                         
                                                                                                      
  // 2. 清空旧数据                        
  await Species.deleteMany();                                                                         
                                                                                                      
  // 3. 读 json 文件，全部存进数据库          
  const speciesData = JSON.parse(fs.readFileSync("./src/data/species.json"));                         
  const species = speciesData.map((s) => new Species(s));   
  await Species.bulkSave(species);                                                                    
                                          
  运行方式：npm run init-db（只需要运行一次）                                                         
                                                                                                      
  运行完之后，数据就永久存在 MongoDB 里了，species.json 只是原始来源，之后不再需要它。
 */ 

import "dotenv/config";

import mongoose from "mongoose";
import fs from "fs";
import { Species } from "../db/schema.js";

await mongoose.connect(process.env.DB_URL);
console.log("Connected to database!");
console.log();

await clearDatabase();
console.log();

await addSpecies();
console.log();

// Disconnect when complete
await mongoose.disconnect();
console.log("Disconnected from database!");

/**
 * Clears all existing data from the database collections.
 */
async function clearDatabase() {
  await Species.deleteMany();
  console.log("Database cleared");
}

/**
 * Loads Pokemon species data from species.json file and saves it to the database.
 * Reads the JSON file, creates Species documents with dexNumber, name, and generation info.
 * @returns {Promise<Array>} Promise that resolves to an array of saved Species documents for use in creating Pokemon teams
 */
async function addSpecies() {
  const speciesData = JSON.parse(fs.readFileSync("./src/data/species.json", { encoding: "utf-8" }));
  console.log(`${speciesData.length} species read from species.json`);
  const species = speciesData.map((s) => new Species(s));
  await Species.bulkSave(species);
  console.log("Pokémon species written to DB");
}
