import { v2 as cloudinary } from 'cloudinary';

function configCloud(){
    cloudinary.config({ 
        cloud_name: 'dzsscl7zu', 
        api_key: '326845585339924', 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
}

async function postImage(req, res, next) {
    configCloud();
}