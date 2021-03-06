import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map, tap } from 'rxjs/operators';

import { RecipeService } from './../recipes/recipe.service';
import { Recipe } from './../recipes/recipe.model';

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) {}

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http
        .put('https://restaurant-recipes-default-rtdb.firebaseio.com/recipes.json', recipes)
        .subscribe( recipes => console.log(recipes) );
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://restaurant-recipes-default-rtdb.firebaseio.com/recipes.json')
        .pipe(
            map( 
                recipes => recipes.map( recipe => ({...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}))
            ),
            tap( recipes => this.recipeService.setRecipes(recipes))
        )
    }
}