import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UploadPage from './components/upload-page/upload-page';
import MediaListPage from './components/media-list/media-list-page';
import MediaDisplayPage from './components/media-display-page/MediaDisplayPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadPage />} />
        <Route path="/media" element={<MediaListPage />} />
        <Route path="/media/display" element={<MediaDisplayPage />} />
      </Routes>
    </Router>
  );
}

export default App;
