import React, { useState } from 'react';
import NoImageSelected from '../../assets/no-image-selected.jpg';

function CreateBook() {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [stars, setStars] = useState(0);
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    const [submitted, setSubmitted] = useState('');
    const [image, setImage] = useState(NoImageSelected);

    const createBook = async (e) => {
        e.preventDefault(); // Prevents page from refreshing
        console.table([title, slug]);

        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('stars', stars);
        formData.append('description', description);
        formData.append('category', categories);
        formData.append('thumbnail', thumbnail);

        try {
            const response = await fetch('https://crud-bookapplication-2.onrender.com/api/books', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setTitle('');
                setSlug('');
                setImage(NoImageSelected);
                setSubmitted('Data Submitted Successfully!');
            } else {
                console.log('Failed to submit data');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleCategoryChange = (e) => {
        setCategories(e.target.value.split(',').map((category) => category.trim()));
    };

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
            setThumbnail(e.target.files[0]);
        }
    };

    return (
        <div>
            <h1>Create Book</h1>
            <p>This is where we create a book.</p>

            {submitted ? (
                <p>{submitted}</p>
            ) : (
                <form className='bookdetails' onSubmit={createBook}>
                    <div className='col-1'>
                        <label>Upload Thumbnail</label>
                        <img src={image} alt='Preview Image' />

                        <input
                            onChange={onImageChange}
                            type='file'
                            accept='image/gif, image/jpeg, image/png'
                        />
                    </div>

                    <div className='col-2'>
                        <div>
                            <label>Title</label>
                            <input
                                type='text'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Slug</label>
                            <input
                                type='text'
                                value={slug}
                                onChange={(e) => setSlug(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Stars</label>
                            <input
                                type='text'
                                value={stars}
                                onChange={(e) => setStars(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Description</label>
                            <textarea
                                rows='4'
                                cols='50'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>Categories (comma-separated)</label>
                            <input
                                type='text'
                                value={categories}
                                onChange={handleCategoryChange}
                            />
                        </div>

                        <input type='submit' value='+ Add Book' />
                    </div>
                </form>
            )}
        </div>
    );
}

export default CreateBook;

