import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import { CommentInput, Message } from '../../../graphql';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>
  ) {}

  async addComment(input: CommentInput): Promise<Comment> {
    return this.commentRepository.save(input);
  }

  async deleteComment(
    id: number,
    context: { req: { user: User } }
  ): Promise<Message> {
    await this.commentRepository.delete({
      id,
      author: { id: context.req.user.id },
    });
    return { data: 'Comment deleted successfully', __typename: 'Message' };
  }
}
