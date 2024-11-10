import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Message } from '@apps/CookSpaceApi/src/graphql';
import { AddCommentDTO } from './dtos/addComment.dto';
import { CommentService } from './comment.service';
import { Comment } from '../../entities/comment.entity';

@Resolver('Recipe')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => Comment)
  addComment(@Args('input') input: AddCommentDTO): Promise<Comment> {
    return this.commentService.addComment(input);
  }

  @Mutation(() => Message)
  deleteComment(@Args('id') id: number, @Context() context): Promise<Message> {
    return this.commentService.deleteComment(id, context);
  }
}
