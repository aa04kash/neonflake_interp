import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function MediaListPage() {
  const [mediaList, setMediaList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/media')
      .then(res => setMediaList(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Media List</h1>  <span><Link className='display-5' to="/">back to upload</Link></span>
      {mediaList.map(media => (
        <div key={media._id}>
          <Link to={`/media/${media._id}`}>
            <h2 className='text-dark text-center'>{media.title}</h2>
            <img className='h-100 w-100' src={media.thumbnailUrl} alt={media.title} />
          </Link>
        </div>
      ))}
      
    </div>
  );
}

export default MediaListPage;
