import { Injectable, ConflictException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from '../../entities/recipe.entity';
import { AddRecipeDTO } from './dtos/addRecipe.dto';
import { User } from '../../entities/user.entity';
import { Message } from '../../../graphql';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>
  ) {}

  async getRecipeList(
    tag: string,
    skip: number,
    take: number
  ): Promise<Recipe[]> {
    const recipes = await this.recipeRepository.find({
      relations: ['author', 'likedBy', 'comments'],
      where: { tags: tag },
      skip,
      take,
    });

    return recipes.map((recipe) => {
      return {
        ...recipe,
        __typename: 'Recipe',
      };
    });
  }

  async getRecipe(id: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      relations: ['author'],
      where: { id },
    });

    return {
      ...recipe,
      __typename: 'Recipe',
    };
  }

  async addRecipe(
    input: AddRecipeDTO,
    context: { req: { user: User } }
  ): Promise<Recipe> {
    let recipe = await this.recipeRepository.findOne({
      where: { title: input.title },
    });
    if (recipe) {
      throw new ConflictException('Recipe already exists');
    }

    recipe = this.recipeRepository.create(input);
    recipe.author = context.req.user;
    recipe.comments = [];
    recipe.likedBy = [];
    await this.recipeRepository.save(recipe);

    return {
      ...recipe,
      __typename: 'Recipe',
    };
  }
  async updateRecipe(
    id: number,
    input: AddRecipeDTO,
    context: { req: { user: User } }
  ): Promise<Recipe> {
    let recipe = await this.recipeRepository.findOne({
      where: { id, title: input.title, author: { id: context.req.user.id } },
    });
    if (recipe) {
      throw new ConflictException('Recipe already exists');
    }

    recipe = this.recipeRepository.create(input);
    await this.recipeRepository.save(recipe);

    return {
      ...recipe,
      __typename: 'Recipe',
    };
  }
  async deleteRecipe(
    id: number,
    context: { req: { user: User } }
  ): Promise<Message> {
    const recipe = await this.recipeRepository.findOne({
      where: { id, author: { id: context.req.user.id } },
    });
    if (recipe) {
      throw new ConflictException('Recipe already exists');
    }

    await this.recipeRepository.delete({ id });

    return {
      data: 'Recipe deleted successfully',
      __typename: 'Message',
    };
  }
  async likeRecipe(recipeId: number): Promise<Recipe> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipe) {
      throw new ConflictException('Recipe not found');
    }

    recipe.likes += 1;
    await this.recipeRepository.save(recipe);

    return {
      ...recipe,
      __typename: 'Recipe',
    };
  }
}
