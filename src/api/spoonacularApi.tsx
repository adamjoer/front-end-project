import axios from "axios";

/* How to use:
When calling one of the functions, you need to fetch the data from the promise and do something with it IE.
getRandomRecipes("x", 2).then(recipes => {
  //The recipes is then all the data so you can do following to eg. get the title of the first recipe.
  console.log(recipes["recipe"][0]["title"]); //This will eg. print the title of the first random recipe to the console.
}

*/

class RecipeApi {
  private static instance: RecipeApi;
  private readonly BASE_URL = "https://api.spoonacular.com/recipes";
  private readonly apiKey;

  private constructor() {
    this.apiKey = process.env.REACT_APP_SPOONACULAR_API_KEY;
  }

  public static getInstance(): RecipeApi {
    return this.instance || (this.instance = new this());
  }

  public getRecipeFromString(searchQuery: string, amount: number, offset: number) {
    return axios.get(`${this.BASE_URL}/complexSearch?apiKey=${this.apiKey}&query=${searchQuery}&number=${amount}&offset=${offset}&addRecipeInformation=true`).then(value => value.data)
  }

  public getRandomRecipes(amount: number) {
    return axios.get(`${this.BASE_URL}/random?apiKey=${this.apiKey}&number=${amount}`).then(value => value.data)
  }

  public getRecipesFromIdBulk(stringIdBulk: string) {
    return axios.get(`${this.BASE_URL}/informationBulks?apiKey=${this.apiKey}&ids=${stringIdBulk}`).then(value => value.data)
  }
}

export default RecipeApi.getInstance()
