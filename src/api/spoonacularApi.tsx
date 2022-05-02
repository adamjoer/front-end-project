import axios from "axios";

/* How to use:
When calling one of the functions, you need to fetch the data from the promise and do something with it IE.
getRandomRecipes("x", 2).then(recipes => {
  //The recipes is then all the data so you can do following to eg. get the title of the first recipe.
  console.log(recipes["recipe"][0]["title"]); //This will eg. print the title of the first random recipe to the console.
}

*/

export class RecipeApi{
  private static instance: RecipeApi;
  private readonly BASE_URL = "https://api.spoonacular.com/recipes";

  public static getInstance(): RecipeApi{
    if(!RecipeApi.instance)
      RecipeApi.instance = new RecipeApi();
    return RecipeApi.instance;
  }

  public getRecipeFromString(apiKey: String, recipeName: String, amount: number){
    return axios.get(`${this.BASE_URL}/complexSearch?apiKey=${apiKey}&query=${recipeName}&number=${amount}&addRecipeInformation=true`).then(value => value.data)
  }

  public getRandomRecipes(apiKey: String, amount: number){
    return axios.get(`${this.BASE_URL}/random?apiKey=${apiKey}&number=${amount}`).then(value => value.data)
  }

  public getRecipesFromIdBulk(apiKey: String, stringIdBulk: String){
    return axios.get(`${this.BASE_URL}/informationBulk?apiKey=${apiKey}&ids=${stringIdBulk}`).then(value => value.data)
  }
}

export default RecipeApi.getInstance()