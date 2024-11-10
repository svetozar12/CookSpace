import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User as UserGql } from '@apps/CookSpaceApi/src/graphql';
import { Recipe } from './recipe.entity';
import { Comment } from './comment.entity';

@Entity()
export class User extends UserGql {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.author)
  recipes: Recipe[];

  @OneToMany(() => Recipe, (recipe) => recipe.likedBy)
  likedRecipes: Recipe[];

  @OneToMany(() => Comment, (comment) => comment.author)
  comments: Comment[];
}
