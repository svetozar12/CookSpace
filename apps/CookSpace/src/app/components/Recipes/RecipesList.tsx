import styles from './RecipesList.module.css';
import {
  Recipe,
  useRecipesQuery,
} from '../../../../../../libs/data-access/src';
import RecipeCard from './RecipeCard';

const Recipes = () => {
  const { data, loading, error } = useRecipesQuery();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div className={styles.cardContainer}>
      {data.recipes.map((recipe) => {
        if (recipe?.__typename !== 'Recipe') return null;
        return <RecipeCard key={recipe.id} {...(recipe as Recipe)} />;
      })}
    </div>
  );
};

export default Recipes;
