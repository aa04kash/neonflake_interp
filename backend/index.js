const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express();
app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

const mediaSchema = new mongoose.Schema({
    title: String,
    description: String,
    videoUrl: String,
    thumbnailUrl: String
});

const Media = mongoose.model('Media', mediaSchema);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'media',
        resource_type: (req, file) => {
            return file.mimetype.startsWith('video') ? 'video' : 'image';
        },
        allowed_formats: ['jpg', 'png', 'mp4', 'avi', 'mpg'],
    },
});

const upload = multer({ storage: storage });



app.post('/upload', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), (req, res) => {
    const { title, description } = req.body;
    const thumbnailUrl = req.files['thumbnail'][0].path;
    const videoUrl = req.files['video'][0].path;

    console.log(title, description, thumbnailUrl, videoUrl)

    const media = new Media({ title, description, thumbnailUrl, videoUrl });
    media.save().then((savedMedia) => {
        res.json(savedMedia)
    }).catch((err) => {
        console.log(err)
        res.status(500).send(err.message)
    })
});

app.get('/media', (req, res) => {
    Media.find()
        .then(media => res.json(media))
        .catch(err => res.status(500).send(err.message));
});

app.get('/media/:id', (req, res) => {
    Media.findById(req.params.id)
        .then(media => res.json(media))
        .catch(err => res.status(500).send(err.message));
});

app.listen(5000, () => {
    console.log("http://localhost:5000");
});
