import React, { Component } from 'react'

export interface reciepeModalProps{
    setObject: (recipe: Boolean) => void;
    
}

export class RecipeModal extends Component <{}, reciepeModalProps>{

    render(){
        return (
            <div>recipeModal</div>
        )

    }

}
