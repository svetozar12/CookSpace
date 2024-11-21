import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { RecipeInput } from '@apps/CookSpaceApi/src/graphql';

export class AddRecipeDTO extends RecipeInput {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ message: 'Ingredients are required', each: true })
  ingredients: string[];

  @IsArray()
  @IsNotEmpty({ message: 'Steps are required', each: true })
  @IsString({ each: true })
  steps: string[];

  @IsNumber()
  cookingTime: number;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  imageUrl: string;
}
