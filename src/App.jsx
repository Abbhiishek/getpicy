import React from 'react'
// import ReactDOM from 'react-dom'
const { useState, useEffect, useRef } = React;
const clientID = "OFcvs5SCk1N6IZeseqXS-5voI-drr7c10nXszbPC8HA";
const utm = "?utm_source=scrimba_degree&utm_medium=referral"
var API_KEY = 'actT5UW7bdrBysvdpsxYUWzMAH6_XcH_ke-nx9U1NwU';


const loadData = (options) => {
  fetch(options.url)
    .then(function(response){
        return response.json()
    })
    .then(function(data){ 
       if (options.onSuccess) options.onSuccess(data)
    })
}

export default function  App (props)  {
  let [photos, setPhotos] = useState([]);
  
  // CHALLENGE:
  // Change the query to one of your interests
  let [query, setQuery] = useState();
  const queryInput = useRef(null);

  const numberOfPhotos = 20;
  const url =
    "https://api.unsplash.com/photos/random/?count=" +
    numberOfPhotos +
    "&client_id=" +
    clientID;

  useEffect(() => {
    const photosUrl = query ? `${url}&query=${query}` : url;

    loadData({
      url: photosUrl,
      onSuccess: res => {
        setPhotos(res);
      }
    });
  }, [query, url , ]);

  const searchPhotos = e => {
    e.preventDefault();
    setQuery(queryInput.current.value);
  };
  
  return (
    <div className="box">
      <h2>🖼️</h2>
      <h1>Search Cool Pictures!</h1>
      <input  class="query_input" type="text" onKeyDown={
        e => {
          if (e.key === 'Enter') {
            searchPhotos(e);
          }
        }
        }
         />
      <div className="grid" >
      { query ?
          photos.map(photo => {
          return (
            <div key={photo.id} className="item">
              <img
                className="img"
                src={photo.urls.regular}
              />
              <div className="caption">
                <span className="credits">Photo by 
                  <a href={photo.user.links.html + utm}>   {photo.user.name} 
                  </a>
                  <span> on </span> 
                  <a href={"https://unsplash.com" + utm}>
                    Unsplash
                  </a>
                </span>
              </div>
            </div>
            );
        }) : ""}
      </div>
        <footer>
          <p>
            Made with ❤️ by <a href="https://abbhishek.me">Abhishek</a>
          </p>
        </footer>
    </div>
  );
};

// CHALLENGE: add your own name and emoji to the website
// ReactDOM.render(<App name="Per" emoji="🧛‍♂️"/>, document.getElementById("root"));
