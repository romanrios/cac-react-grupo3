import { useState,useEffect } from 'react';
import { getGifs } from '../../helpers/getGifs';




export const useFetchGifs = (category) => {
      const [images, setImages] = useState([ ]);
      const [isLoading, setIsLoading] = useState( true) 
    const getImagenes = async() => {
    const newImagenes = await getGifs( category);
    setImages(newImagenes);
    setIsLoading( false);
  }
    
  useEffect(() => {
    getImagenes();   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] ) 


    return {
         images,
        isLoading
    }
 
}
