import { IsArray, IsString } from 'class-validator';
import { RecipeInput } from '@apps/CookSpaceApi/src/graphql';

export class AddRecipeDTO extends RecipeInput {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  steps: string[];

  @IsString()
  cookingTime: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
