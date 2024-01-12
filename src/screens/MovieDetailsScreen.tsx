import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ActivityIndicator,
  ImageBackground,
  Image,
  FlatList,
} from 'react-native';
import {Touchable} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {baseImagePath, movieCastDetails, movieDetails} from '../api/apicalls';
import InputHeader from '../components/InputHeader';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';
import {useNavigation} from '@react-navigation/native';

const getMovieDetails = async (movieid: number) => {
  //console.log(movieDetails(movieid));
  try {
    let response = await fetch(movieDetails(movieid)); //this is the api name of movieDetails
    let json = await response.json();
    return json;
  } catch (error) {
    console.error('Something went wrong in getMovieDetails function', error);
  }
};
console.log();

const getMovieCastDetails = async (movieid: number) => {
  // console.log(movieCastDetails(movieid));
  try {
    let response = await fetch(movieCastDetails(movieid)); //this is the api name of movieCastDetails
    let json = await response.json();
    return json;
  } catch (error) {
    console.error(
      'Something went wrong in getMovieCastDetails function',
      error,
    );
  }
};
console.log();

const MovieDetailsScreen = ({navigation, route}: any) => {
  const [movieData, setMovieData] = React.useState(undefined);
  const [movieCastData, setMovieCastData] = React.useState(undefined);

  // const handleButtonPress = () => {
  //   navigation.navigate('SeatBookingScreen'); // Navigate to HomeScreen
  // };

  React.useEffect(() => {
    (async () => {
      const tempMovieData = await getMovieDetails(route.params.movieid);
      setMovieData(tempMovieData);
    })(); //this is a self executing function

    (async () => {
      const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
      setMovieCastData(tempMovieCastData.cast);
    })(); //this is a self executing function
  }, []); //we add this dependency array because we do not want the function to run for infinite times
  //console.log('1111,', movieData);
  if (
    movieData == undefined &&
    movieData == null &&
    movieCastData == undefined &&
    movieCastData == null
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name="close"
            header={''}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar hidden />

      <View>
        <ImageBackground
          source={{
            uri: baseImagePath('w780', movieData?.backdrop_path),
          }}
          style={styles.imageBG}>
          <LinearGradient
            colors={[COLORS.BlackRGB10, COLORS.Black]}
            style={styles.linearGradient}>
            <View style={styles.appHeaderContainer}>
              <AppHeader
                name="close"
                header={''}
                action={() => navigation.goBack()}
              />
            </View>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.imageBG}></View>
        <Image
          source={{
            uri: baseImagePath('w342', movieData?.poster_path),
          }}
          style={styles.cardImage}
        />
      </View>
      <View style={styles.timeContainer}>
        <CustomIcon name="clock" style={styles.clockIcon} />
        <Text style={styles.runtimeText}>
          {Math.floor(movieData?.runtime / 60)}h{' '}
          {Math.floor(movieData?.runtime % 60)}.
        </Text>
      </View>

      <View>
        <Text style={styles.title}>{movieData?.original_title}</Text>
        <View style={styles.genreContainer}>
          {movieData?.genres.map((item: any) => {
            return (
              <View style={styles.genreBox} key={item.id}>
                <Text style={styles.genreText}>{item.name}</Text>
              </View>
            );
          })}
        </View>
        <Text style={styles.tagline}> {movieData?.tagline} </Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.rateContainer}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text numberOfLines={1} style={styles.runtimeText}>
            {movieData?.vote_average.toFixed(1)} ({movieData?.vote_count})
          </Text>
          <Text style={styles.runtimeText}>
            {movieData?.release_date.substring(8, 10)}{' '}
            {/* select digits 8 to 10 of the release_date */}
            {new Date(movieData?.release_date).toLocaleString('default', {
              month: 'long',
            })}{' '}
            {movieData?.release_date.substring(0, 4)}
            {/* select first four digits of the release_date */}
          </Text>
        </View>
        <Text style={styles.descriptionText}>{movieData?.overview}</Text>
      </View>
      <View>
        <CategoryHeader title={'Top Cast'} />
        <FlatList
          data={movieCastData}
          keyExtractor={(item: any) => item.id}
          horizontal
          contentContainerStyle={styles.containerGap24}
          renderItem={({item, index}) => (
            <CastCard
              shouldMarginatedatEnd={true}
              cardWidth={80}
              isFirst={index == 0 ? true : false}
              isLast={index == movieCastData?.length - 1 ? true : false}
              imagePath={baseImagePath('w185', item.profile_path)}
              title={item.original_name}
              subTitle={item.character}
            />
          )}
        />
      </View>
      <View>
        <TouchableOpacity
          style={styles.buttonBG}
          onPress={() => {
            navigation.push('SeatBooking', {
              bgImage: baseImagePath('w780', movieData?.backdrop_path),
              PosterImage: baseImagePath('original', movieData?.poster_path),
            });
          }}>
          <Text style={styles.buttonText}> Select Seats</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  normalText: {
    color: COLORS.White,
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    backgroundColor: COLORS.Black,
  },

  loadingTxt: {
    color: COLORS.White,
  },

  scrollViewContainer: {
    flex: 1,
  },

  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%', // Set the width of the image
    aspectRatio: 3072 / 1727,
  },

  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '60%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.WhiteRGBA50,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    color: COLORS.White,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    textAlign: 'center',
    marginVertical: SPACING.space_10,
    marginHorizontal: SPACING.space_36,
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    borderColor: COLORS.Orange,
    backgroundColor: COLORS.Orange,
    borderWidth: 1,
    marginHorizontal: SPACING.space_36 * 3.3,
    marginVertical: SPACING.space_20,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_25 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
});

export default MovieDetailsScreen;
