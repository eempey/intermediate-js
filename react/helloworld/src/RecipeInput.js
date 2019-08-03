import React, {Component} from 'react';
import './RecipeInput.css';

class RecipeInput extends Component {
    static defaultProps = {
        onClose() {},
        onSave() {}
    }

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNewIngredient = this.handleNewIngredient.bind(this);
        this.handleChangeIngredient = this.handleChangeIngredient.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSave({...this.state});
        this.setState({
            title: '',
            instructions: '',
            ingredients: [''],
            img: ''
        })
    }

    handleChangeIngredient(event) {
        const index = Number(event.target.name.split('-')[1]);
        const ingredients = this.state.ingredients.map((ingredient, i) => (
            i === index ? event.target.value : ingredient
        ));
        this.setState({ingredients});
    }

    handleNewIngredient(event) {
        const {ingredients} = this.state;
        this.setState({ingredients: [...ingredients, '']})
    }

    render() {
        const {title, instructions, img, ingredients} = this.state;
        const {onClose} = this.props;
        let inputs = ingredients.map((ingredient, index) => (
            <div
                className="recipe-form-line"
                key={`ingredient-${index}`}
            >
                <label>{index+1}.
                    <input
                        type="text"
                        name={`ingredient-${index}`}
                        value={ingredient}
                        size={45}
                        autoComplete="off"
                        placeholder="Ingredient"
                        onChange={this.handleChangeIngredient}
                    />
                </label>
            </div>
        ));

    return (
        <div className="recipeFormContainer">
            <form className='recipe-form' onSubmit={this.handleSubmit}>
                <button
                    type='button'
                    className='close-button'
                    onClick={onClose}
                >X</button>
                <div className='recipe-form-line'>
                    <label htmlFor='recipe-title-input'>Title</label>
                    <input
                        id='recipe-title-input'
                        key='title'
                        name='title'
                        type='text'
                        value={title}
                        size={42}
                        autoComplete="off"
                        onChange={this.handleChange}/>
                </div>
                <label
                    htmlFor='recipe-instructions-input'
                    style={{marginTop: '5px'}}
                >
                    Instructions
                </label>
                <textarea
                    key='instructions'
                    id='recipe-instructions-input'
                    type='Instructions'
                    name="instructions"
                    cols="30"
                    rows="10"
                    autoComplete='off'
                    value={instructions}
                    onChange={this.handleChange}
                />
                {inputs}
                <button
                    type='button'
                    onClick={this.handleNewIngredient}
                    className='buttons'
                >
                    +
                </button>
                <div className='recipe-form-line'>
                    <label htmlFor='recipe-img-input'>Image Url</label>
                    <input
                        id='recipe-img-input'
                        type="text"
                        placeholder=''
                        name='img'
                        value={img}
                        size={36}
                        autoComplete='off'
                        onChange={this.handleChange}
                    />
                </div>
                <button
                    type='submit'
                    className='buttons'
                    style={{alignSelf: 'flex-end', marginRight: 0}}
                >SAVE</button>
            </form>
        </div>
    )
    }
}

export default RecipeInput;