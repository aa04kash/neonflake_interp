import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UploadPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [video, setVideo] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('thumbnail', thumbnail);
    formData.append('video', video);

    axios.post('http://localhost:5000/upload', formData)
      .then(res => console.log(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div className="container d-flext justify-content-center">
      <dl>
        <h1>Upload Media</h1>
        <dt>Title</dt>
        <dd><input type="text" placeholder="Title" maxLength="50" value={title} onChange={e => setTitle(e.target.value)} /></dd>
        <dt>Description</dt>
        <dd><textarea placeholder="Description" maxLength="200" value={description} onChange={e => setDescription(e.target.value)} /></dd>
        <dt>Image</dt>
        <dd><input type="file" accept="image/*" onChange={e => setThumbnail(e.target.files[0])} /></dd>
        <dt>Video</dt>
        <dd><input type="file" accept="video/*" onChange={e => setVideo(e.target.files[0])} /></dd>
        <button className='btn btn-primary' onClick={handleUpload}>Upload</button>
      </dl>
      <Link className='btn btn-success me-2' to="/media/display">Media Display</Link>
      <Link className='btn btn-warning' to="/media">Media List</Link>
    </div>
  );
}

export default UploadPage;
