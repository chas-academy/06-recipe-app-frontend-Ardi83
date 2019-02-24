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
    ingredients: Ingredient[],
    rating: number,
    comments: Comment[]
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

interface Comment {
    headline: string,
    body: string,
    rank: number
}

interface Pages {
    current_page: number,
    from: number,
    last_page: number,
    path: string,
    per_page: number,
    to: number,
    total: number
}

interface GetPages {
    meta: Pages[]
}