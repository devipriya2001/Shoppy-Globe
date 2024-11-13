import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found">
    <h2>Page Not Found</h2>
    <Link to="/">Go to Home</Link>
  </div>
);

export default NotFound;

