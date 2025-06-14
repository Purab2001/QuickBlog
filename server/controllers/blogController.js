import fs from 'fs';
import imagekit from '../configs/imageKit.js';
import Blog from '../models/Blog.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // Check if all required fields are provided
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: 'All fields are required' });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Upload the image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        })

        // Optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality: 'auto' },
                { format: 'webp' },
                { width: '1280' }
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({ title, subTitle, description, category, image, isPublished });
        
        res.json({ success: true, message: 'Blog added successfully' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
        
    }
}