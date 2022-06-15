require('dotenv').config();
const { google} = require('googleapis');
const fs = require('fs');
const path = require('path');


const CLIENT_ID= process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN
const FILE_ID ='1eDdy_sE-Rti1dm10Uw-umLWi43TFjiTa'


const oauth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oauth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

const drive = google.drive({
    version: 'v3',
    auth: oauth2Client
})

module.exports = {
    downloadFile : async ()=>{
        try {
            const file = await drive.files.get({
              fileId: FILE_ID,
              alt: 'media',
            });
            return (file.data);
          } catch (err) {
            // TODO(developer) - Handle error
            throw err;
          }

    },
    uploadFile : async () => {
        try {
            const createFile = await drive.files. create({
                requestBody:{
                    name: "notas.txt",
                    mimeType:'text/plain'
                },
                media:{
                    mimeType:'text/plain',
                    body: fs.createReadStream(path.join(__dirname,'/../notas.txt'))
                }
            })
            console.log(createFile.data);
            
        } catch (error) {
            console.log(error)
            
        }

    },
}