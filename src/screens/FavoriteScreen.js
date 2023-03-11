import React, { useEffect, useState } from 'react'
import RecipeList from './../components/RecipeList'
import { getFavoritesRecipes} from "../services/RecipeAPI";
import { useAuth } from "../context/AuthContext";

export default function FavoriteScreen({navigation}) {

    const [favorites, setFavorites] = useState([])
    const { token } = useAuth();

    useEffect(()=>{ 
        const fetch = async() => {
            const result = await getFavoritesRecipes(token);
            setFavorites(result);
        }
        fetch();
    },[])

    useEffect(()=>{
        const focusHandler = navigation.addListener('focus', async() => {
            setFavorites([]);
            const result = await getFavoritesRecipes(token);
            setFavorites(result);
        });
        return focusHandler;
    },[navigation])

  return (
    <RecipeList navigation={navigation} recipes={favorites} favorites={favorites} setFavorites={setFavorites}/>
  )
}
