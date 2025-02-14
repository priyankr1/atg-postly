const multer = require('multer');
const catchAsync=require("../utils/catchAsync");
const sharp = require('sharp');
const { storage } = require('../config/firebaseConfig');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { v4: uuidv4 } = require('uuid');


const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('Not an image! Please upload only images.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadUserPhoto = upload.single('pic');
const uploadPostPhoto = upload.single('image');


const resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.buffer = await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  next();
});
const resizePostPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.buffer = await sharp(req.file.buffer)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toBuffer();

  next();
});

const uploadPhotoToFirebase = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const fileBuffer = req.file.buffer;
  const fileExtension = req.file.mimetype.split('/')[1]; // Extract file extension from mimetype
  const uniqueId = uuidv4();
  const timestamp = Date.now();
  const fileName = `${uniqueId}-${timestamp}.${fileExtension}`;

  try {
    const storageRef = ref(storage, `users/${fileName}`);
    const uploadResult = await uploadBytes(storageRef, fileBuffer);
    const downloadUrl = await getDownloadURL(uploadResult.ref);

    req.file.filename = downloadUrl;

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = { uploadUserPhoto,uploadPostPhoto, resizeUserPhoto, uploadPhotoToFirebase,resizePostPhoto };
