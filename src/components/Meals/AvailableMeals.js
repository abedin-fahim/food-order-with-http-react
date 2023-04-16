import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState(null)

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch('https://food-order-app-abedin-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json')

      // Checking for any error
      if(!response.ok){
        console.log('checked')
        throw new Error('Something went wrong')
      }

      const data = await response.json()

      // The response will be from firebase an object, we can convert it to an array using for in loop
      const loadedMeals = []

      for(const key in data){
        loadedMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price
        })
      }
      setMeals(loadedMeals);
      setIsLoading(false)
    };

    fetchMeals()
      .catch((error)=> {
        setIsLoading(false)
        setHttpError(error.message)
      })
  }, [])

  if(isLoading){
    return (
      <section className={classes.mealsLoading}> 
        <p>Cooking...</p>
      </section>
    )
  }

  if(httpError){
    return (
      <section className={classes.mealsError}>
        <p>{httpError}</p>
      </section>
    )
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
        {/* Or we can return it even before mapping the list */}
        {/* {isLoading && <p>Cooking...</p>} */}
      </Card>
    </section>
  );
};

export default AvailableMeals;
