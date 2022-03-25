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

export default function App() {
  const gState = useContext(GlobalState);
  const [page, setPage] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleOverlay = () => {
    isUserLoggedIn ? setLoggedIn(false) : setLoggedIn(true);
  }
  const createNewUser = () => {
    axios.post('http://localhost:8080/api/v1/user', {
      username: username,
      password: password
    }).then(res => console.log(res));
  }
  const loginUser = () => {
    axios.get('http://localhost:8080/api/v1/user')
    .then(res => {
      console.log(res.status === 200)
      if(res.status === 200){
        setLoggedIn(true);
        console.log('setsUser')
        gState.setTheUser(res.data[0]);
      }
    })
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
          {page === 0 && <StatsPage user={{username: username, password: password}}/>}
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
          <Overlay isVisible={!loggedIn}>
            <Card>
              <Text>Hey there, noticed you havent made an account yet...</Text>
              <Input onChangeText={(val, ind)=>setUsername(val)} label='username' value={username}/>
              <Input onChangeText={(val, ind)=>setPassword(val)} label='password' value={password}/>
              <Button title='Login' onPress={loginUser}/>
              <Button title='Create an account' onPress={createNewUser}/>
            </Card>
          </Overlay>
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
