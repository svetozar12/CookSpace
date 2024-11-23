import React from 'react';
import styles from './RecipeCard.module.css';
import { Recipe } from '../../../../../../libs/data-access/src';
import { Rating, Typography } from '@mui/material';
type RecipeCardProps = Recipe;

const RecipeCard = ({ title, description, imageUrl }: RecipeCardProps) => {
  return (
    <div className={styles.card}>
      <img width={285} height={190} src={imageUrl} alt={title} />
      <div className={styles.cardContent}>
        <p>{description.toUpperCase()}</p>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Rating
            name="half-rating"
            defaultValue={2.5}
            precision={0.5}
            style={{ width: '70%' }}
            size="small"
            readOnly
          />
          <Typography
            variant="body2"
            style={{ color: 'rgba(0,0,0,.65)', width: 'fit-content' }}
          >
            25 ratings
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
