import { useState } from 'react';


// eslint-disable-next-line react/prop-types
export const AddCategory = ({onNewCategory}) => {
    const [inputValue, setInputVallue] = useState('');

    const inputCambios = ({target}) => {
        setInputVallue( target.value );
    }
    const onSubmit = (event) => {
        event.preventDefault();
        if( inputValue.trim().length <= 1) return;
        setInputVallue('');
        onNewCategory( inputValue.trim());
        
        
    }

    return(
        <form onSubmit={ onSubmit }>

        <input type="text"
        placeholder="Buscar Gifs"
        value={inputValue}
        onChange={inputCambios}
        />
        </form>
        
        
        

    )
}