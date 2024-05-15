

export const getGifs = async( category )=> {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=2oNybmGKB3YZWGqK25id0f4alwlrYdwe&q=${category}&limit=20`
    const resp = await fetch(url);

     const {data} = await resp.json();

     const gifs = data.map(img => ({
      id: img.id,
      title: img.title,
      url:img.images.downsized_medium.url
    }));
    return gifs;


  }
    


// const API = "api.giphy.com/v1/gifs/se-arch?api_key=Yy52y3LDIkwElkq6uiZHhPB2yGkDnSis&q"

// export const getGifs = (path) => {

//     return fetch (API+path,{
//         headers : {
//             Authorization : "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMjJkZDEyM2I0Yjk3ZmFmMGFhOTVhOTFlMWMzMjVhNiIsInN1YiI6IjY2MzgyMjRjY2FhNTA4MDEyNmY1M2FlYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.He_Dgvcy9mXIXI26WrV-DjiUBXzqPkhtUxwBWYZc8iA","Content-type":"application/json;charset=utf-8"
//         }
                                                  

//     }).then((results)=>results.json())
// -

// }