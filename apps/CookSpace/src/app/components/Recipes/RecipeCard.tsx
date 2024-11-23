import React from 'react';
import styles from './RecipeCard.module.css';
import { Recipe } from '../../../../../../libs/data-access/src';
import { Text } from '@fluentui/react';
type RecipeCardProps = Recipe;

const RecipeCard = ({ title, description, imageUrl }: RecipeCardProps) => {
  return (
    <div className={styles.card}>
      <img width={300} height={200} src={imageUrl} alt={title} />
      <p>{description}</p>
      <Text>{title}</Text>
    </div>
  );
};

export default RecipeCard;
