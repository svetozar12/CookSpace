import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';
import { Recipe } from '../../entities/recipe.entity';
import { User } from '../../entities/user.entity';
import { Comment } from '../../entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, User, Comment])],
  providers: [RecipeService, RecipeResolver],
})
export class RecipeModule {}
