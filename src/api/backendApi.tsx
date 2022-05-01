import axios from "axios";
import {User} from "../types/User"
import {List} from "../types/List"
import {Rating} from "../types/Rating"

class BackendApi{
  private static instance: BackendApi;
  private readonly BASE_URL = 'https://recipe.bhsi.xyz/backend';

  public static getInstance(): BackendApi{
    if(!BackendApi.instance)
      BackendApi.instance = new BackendApi();
    return BackendApi.instance;
  }

  public getUser(userId: number){
    return axios.get<User>(`${this.BASE_URL}/users/${userId}/`);
  }

  public getUserLists(userId: number){
    return axios.get<List[]>(`${this.BASE_URL}/users/${userId}/lists/`);
  }

  public getUserList(userId: number, listId: number){
    return axios.get<List>(`${this.BASE_URL}/users/${userId}/lists/${listId}`);
  }

  public getUserRatings(userId: number) {
    return axios.get<Rating[]>(`${this.BASE_URL}/users/${userId}/ratings/`);
  }

  public getUserRecipeRating(userId: number, recipeId: number){
    return axios.get<Rating>(`${this.BASE_URL}/users/${userId}/ratings/${recipeId}`);
  }

  public getRatings(){
    return axios.get<Rating[]>(`${this.BASE_URL}/ratings/`);
  }

  public getRating(recipeId: number){
    return axios.get<Rating>(`${this.BASE_URL}/ratings/${recipeId}`)
  }

  public addListToUser(userId: number, listTitle: String){
    return axios.post<String>(`${this.BASE_URL}/lists`, {user_id: userId, title: listTitle}).then(value => console.log(value.data)) //This is for logging the response of the post
  }

  public addRecipeToList(recipeId: number, listId: number){
    return axios.post<String>(`${this.BASE_URL}/lists/recipe`, {recipe_id: recipeId, list_id: listId}).then(value => console.log(value.data))
  }

  public addToRatings(recipeId: number, userId: number, ratingScore: number){
    return axios.post<String>(`${this.BASE_URL}/ratings`, {recipe_id: recipeId, user_id: userId, score: ratingScore}).then(value => console.log(value.data))
  }

  public addUser(userName: String, firstName: String, lastName: String, email: String, passwordHash: String){
    return axios.post<String>(`${this.BASE_URL}/users/register`, {username: userName, first_name: firstName, last_name: lastName, email: email, password_hash: passwordHash}).then(value => console.log(value.data))
  }
}