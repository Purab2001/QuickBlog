

export const addBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, image, isPublished } = req.body;
        const imageFile = req.file;

        // Check if all required fields are provided
        if (!title || !description || !category || !imageFile) {
            return res.json({ success: false, message: 'All fields are required' });
        }
    } catch (error) {
        return res.json({ success: false, message: error.message });
        
    }
}