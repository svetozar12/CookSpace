import React from 'react';
import { Recipe } from '../../../../../../libs/data-access/src';
import { PlainCard } from '@fluentui/react';
type RecipeCardProps = Recipe;

const RecipeCard = (recipe: RecipeCardProps) => {
  return <PlainCard>RecipeCard</PlainCard>;
};

export default RecipeCard;
