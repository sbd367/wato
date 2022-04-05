import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useContext, useState } from 'react';
import {BottomSheet, Button, ButtonGroup, Card, Header, Input, Overlay, SearchBar} from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import OddsSetter from './Views/OddsSetter';
import StatsPage from './Views/StatsPage';
import BetSetter from './Views/BetSetter';
import { GlobalStateProvidor } from './store/stateStore';
import GlobalState from './store/stateStore';
import axios from 'axios';
import LoginModal from './Views/loginModal';

export default function App() {
  const gState = useContext(GlobalState);
  const [page, setPage] = useState(0);
  

  const toggleOverlay = () => {
    isUserLoggedIn ? setLoggedIn(false) : setLoggedIn(true);
  }

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <GlobalStateProvidor>
          <Header
            leftComponent={{icon: 'menu', color:'#fff'}}
            centerComponent={{ text: 'What Are The Odds', style: styles.heading }}
          />
          <StatusBar style="auto" />
          <View style={styles.topContainer}>
            {page === 0 && <StatsPage/>}
            {page === 1 && <OddsSetter/>}
            {page === 2 && <BetSetter/>}
          </View>
          <View style={styles.bottomContainer}>
            <ButtonGroup
              style={styles.buttonRow}
              buttons={['Stats', 'Bet', 'Bounty']}
              selectedIndex={page}
              onPress={(val) => {
                setPage(val);
              }}
            />
          </View>
          <LoginModal/>
        </GlobalStateProvidor>
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 2
  },
  bottomContainer: {
    flex: .3
  },
  buttonRow: {
    alignSelf: 'flex-end'
  },
  cardStyle: {
  },
  bottomButton: {
    flex: 0,
    position: 'relative'
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#397af8',
    marginBottom: 20,
    width: '100%',
    paddingVertical: 15,
  },
  heading: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  topText: {
    color: 'black',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 50,
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerRight: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 5,
  },
  subheaderText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
