import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe as RecipeGql } from '@apps/CookSpaceApi/src/graphql';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Recipe extends RecipeGql {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  title: string;

  @Column({ type: 'varchar', length: 30 })
  description: string;

  @Column('text', { array: true })
  ingredients: string[];

  @Column('text', { array: true })
  steps: string[];

  @Column({ type: 'integer' })
  cookingTime: number;

  @Column('text', { array: true })
  tags: string[];

  @Column({ type: 'integer', default: 0 })
  likes: number;

  @ManyToMany(() => User, (user) => user.likedRecipes)
  @JoinTable()
  likedBy: User[];

  @ManyToMany(() => Comment, (comment) => comment)
  @JoinTable()
  comments: Comment[];

  @Column({ type: 'varchar' })
  createdAt: string;

  @ManyToOne(() => User, (user) => user.recipes)
  author: User;
}
