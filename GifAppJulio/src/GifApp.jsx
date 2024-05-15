import { useState } from "react"
import { AddCategory,GifGrid } from "./components";




export const GifApp = () => {
    const [categories, setCategories] = useState(['Messi']);

    const onAddCategory = ( newCategory ) => {
        if (categories.includes(newCategory)) return;
        setCategories([newCategory, ...categories])
    }
    return (
        <>
        <h1>BUSCA TUS GIF FAVORITOS</h1>
        <AddCategory 
        onNewCategory = { onAddCategory }
        />
        {
            categories.map((category) => (
            <GifGrid key={category}
            category={category}/>
            ))
        }
            
        
            
            
        </>
    )
}