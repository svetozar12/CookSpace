import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Message } from '@apps/CookSpaceApi/src/graphql';
import { AddRecipeDTO } from './dtos/addRecipe.dto';
import { RecipeService } from './recipe.service';
import { Recipe } from '../../entities/recipe.entity';

@Resolver('Recipe')
export class RecipeResolver {
  constructor(private readonly recipeService: RecipeService) {}

  @Query(() => [Recipe])
  recipes(
    @Args('tag') tag: string,
    @Args('skip') skip: number
  ): Promise<Recipe[]> {
    return this.recipeService.getRecipeList(tag, skip, 10);
  }

  @Query(() => Recipe)
  recipe(@Args('id') id: number): Promise<Recipe> {
    return this.recipeService.getRecipe(id);
  }
  @Mutation(() => Recipe)
  addRecipe(
    @Args('input') input: AddRecipeDTO,
    @Context() context
  ): Promise<Recipe> {
    return this.recipeService.addRecipe(input, context);
  }

  @Mutation(() => Recipe)
  updateRecipe(
    @Args('id') id: number,
    @Args('input') input: AddRecipeDTO,
    @Context() context
  ): Promise<Recipe> {
    return this.recipeService.updateRecipe(id, input, context);
  }

  @Mutation(() => Message)
  deleteRecipe(@Args('id') id: number, @Context() context): Promise<Message> {
    return this.recipeService.deleteRecipe(id, context);
  }

  @Mutation(() => Recipe)
  likeRecipe(@Args('id') id: number): Promise<Recipe> {
    return this.recipeService.likeRecipe(id);
  }
}
