import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Dimensions, StatusBar, FlatList } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';
import { baseImagePath, searchMovies } from '../api/apicalls';
import SubMovieCard from '../components/SubMovieCard';


const {width,height} = Dimensions.get('screen');

const SearchScreen = ({navigation} : any) => {

  const [searchList, setSearchList] = React.useState([]);

  const searchMoviesFunction = async (name : string) => {
    try{
let response = await fetch(searchMovies(name));
let json = await response.json();
setSearchList (json.results);
    }catch(error){
      console.error("Something went wrong in the searchMoviesFunction", error);
    }
  }
  
  return (
    <View style={styles.container}>
        < StatusBar hidden/>
      
       <View>    
        <FlatList 
            data = {searchList}
            keyExtractor={(item : any) => item.id}
            bounces = {false} 
            showsVerticalScrollIndicator ={false}
            numColumns={2}
            ListHeaderComponent={
                  <View style = {styles.InputHeaderContainer}>
                      <InputHeader searchFunction = {searchMoviesFunction}/> 
                 </View>
                      }
            contentContainerStyle = {styles.centerContainer}
            renderItem={({item,index}) => (
                    <SubMovieCard 
                      shouldMarginatedatEnd={false}
                      shouldMarginatedAround={true}
                      cardFunction={() =>{
                      navigation.push('MovieDetails', {movieid:item.id})
                      }}
                      cardWidth={width/2.5}
                      title={item.original_title} 
                      imagePath={baseImagePath('w342',item.poster_path)} //title and imagePath are the names of the props assigned at subMovieCard
                      />
   
                    )}
                  /> 
          </View>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex : 1,
    width,
    alignItems: 'center',
    backgroundColor: COLORS.Black
  },
  InputHeaderContainer:{
    display: 'flex',
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_28,
    marginBottom: SPACING.space_28-SPACING.space_12,
   
    
  },

  centerContainer:{
    alignItems: 'center',
    marginHorizontal: SPACING.space_28
  },
});

export default SearchScreen;