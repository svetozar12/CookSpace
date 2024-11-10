import { IsNumber, IsString } from 'class-validator';
import { CommentInput } from '@apps/CookSpaceApi/src/graphql';

export class AddCommentDTO extends CommentInput {
  @IsNumber()
  recipeId: number;

  @IsString()
  content: string;
}
