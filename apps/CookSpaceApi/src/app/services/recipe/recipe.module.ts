import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipe } from '../../entities/recipe.entity';
import { RecipeService } from './recipe.service';
import { RecipeResolver } from './recipe.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe])],
  providers: [RecipeService, RecipeResolver],
})
export class RecipeModule {}
