import React from 'react';
import styles from './RecipeCard.module.css';
import { Recipe } from '../../../../../../libs/data-access/src';
import { Rating, Typography } from '@mui/material';
type RecipeCardProps = Recipe;

const RecipeCard = ({ title, description, imageUrl }: RecipeCardProps) => {
  return (
    <div className={styles.card}>
      <img width={300} height={200} src={imageUrl} alt={title} />
      <div className={styles.cardContent}>
        <p>{description.toUpperCase()}</p>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Rating
          name="half-rating"
          defaultValue={2.5}
          precision={0.5}
          readOnly
        />
      </div>
    </div>
  );
};

export default RecipeCard;
