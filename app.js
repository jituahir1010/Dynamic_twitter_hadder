const twitterClient = require('twitter-api-client')
const express = require("express")
const app = express()
const client = require('./client')
const {saveImage, createBanner, updateBanner, delfiles} = require('./imageHandler')
const fs = require("fs");
const fsPromises = fs.promises
const CronJob = require('cron').CronJob;



const job = new CronJob(' * * * * * ', async function(){
    await followers()
})

job.start()

// updateBanner()

async function followers() {
   const parms = {
        screen_name : "jituahir14",
        count : 4
    }
   

   try {
    data =  await client.accountsAndUsers.followersList(parms)
    for (let follower of data.users){
        const url = follower.profile_image_url_https
        const filename = `${follower.screen_name}` 
        
        await saveImage(filename, url)
    }
   
await createBanner()
await updateBanner()
await delfiles()

   } 
   
   catch (error) {
    console.log(error);
   }
}


// 
app.get('/', (req,res) =>{
    followers()
    res.send("hello")
})


// app.listen(5000,()=>{
//     console.log(`server is up and running 5000`);
// })





