import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function MediaDisplayPage() {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/media')
      .then(res => setMediaList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className='container d-flext justify-content-center'>
      <h1>Media Display</h1>
      <Link className='display-5' to="/media">Back to Media List</Link>
      <div className="media-list">
        {mediaList.map(media => (
          <div key={media._id} className="media-item">
            <h2>{media.title}</h2>
            <p>{media.description}</p>
            <video src={media.videoUrl} controls autoPlay />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaDisplayPage;
