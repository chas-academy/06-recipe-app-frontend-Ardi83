interface Recipe {
    author: string,
    title: string,
    instructure: string,
    name: string,
    description: string,
    country: string,
    type: string,
    allergic_type: string,
    energy: number,
    preparing_time: string,
    cooking_time: string,
    image: string,
    ingredients: Ingredient[]
}

interface GetRecipes {
    data: Recipe[]
}

interface GetRecipe {
    data: Recipe
}

interface Ingredient {
    name: string,
    amount: string
}