import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Comment as CommentGql } from '@apps/CookSpaceApi/src/graphql';
import { User } from './user.entity';
import { Recipe } from './recipe.entity';

@Entity()
export class Comment extends CommentGql {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  content: string;

  @OneToOne(() => User, (user) => user.comments)
  author: User;

  @OneToOne(() => User, (user) => user.recipes)
  recipe: Recipe[];
}
