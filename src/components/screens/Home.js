import React, { useState, useEffect } from 'react';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server when the component mounts
    fetch('http://localhost:5000/allpost', {
      headers: {
        Authorization: 'Bearer '+localStorage.getItem('jwt'),
      },
    })
      .then((res) => res.json())
      .then((result) => {
       console.log(result)   
        setData(result.posts);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);

  return (
    <div className='home'>
      {/* Map over the 'data' array and render each post */}
      {data.map((item) => (
        <div className='card home-card' key={item._id}>
          <h5>{item.postedBy.name}</h5>
          <div className='card-image'>
            <img src={item.photo} alt='post' />
          </div>
          <div className='card-content'>
            <i className='material-icons' style={{ color: 'red' }}>
              favorite
            </i>
            <h4>{item.title}</h4>
            <p>{item.body}</p>
            <input type='text' placeholder='Add a comment' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
