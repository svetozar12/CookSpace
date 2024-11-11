import React from 'react';
import { useRecipesQuery } from '../../../../../libs/data-access/src';

const Recipes = () => {
  const { data, loading, error } = useRecipesQuery();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      Recipes
      {data.recipes.map((recipe) => (
        <div key={recipe?.id}>{recipe?.title}</div>
      ))}
    </div>
  );
};

export default Recipes;
