import { IsArray, IsOptional, IsString } from 'class-validator';
import { RecipeInput } from '@apps/CookSpaceApi/src/graphql';

export class UpdateRecipeDTO extends RecipeInput {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  ingredients: string[];

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  steps: string[];

  @IsString()
  @IsOptional()
  cookingTime: number;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags: string[];
}
