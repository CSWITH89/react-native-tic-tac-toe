import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Text,
  Alert,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [gameBoard, setGameBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const initializeGame = () => {
    setPlayerTurn(1);
    setGameBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  };

  const checkWinState = () => {
    const NUM_TILES = 3;
    let currentGameBoard = gameBoard;
    let sum;

    // Check rows
    for (let i = 0; i < NUM_TILES; i++) {
      sum =
        currentGameBoard[i][0] +
        currentGameBoard[i][1] +
        currentGameBoard[i][2];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // Check columns
    for (let i = 0; i < NUM_TILES; i++) {
      sum =
        currentGameBoard[0][i] +
        currentGameBoard[1][i] +
        currentGameBoard[2][i];
      if (sum === 3) {
        return 1;
      } else if (sum === -3) {
        return -1;
      }
    }

    // Check diagonals
    sum =
      currentGameBoard[0][0] + currentGameBoard[1][1] + currentGameBoard[2][2];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }
    sum =
      currentGameBoard[0][2] + currentGameBoard[1][1] + currentGameBoard[2][0];
    if (sum === 3) {
      return 1;
    } else if (sum === -3) {
      return -1;
    }

    // No win state
    return 0;
  };

  const renderGamePiece = (row, col) => {
    let value = gameBoard[row][col];
    switch (value) {
      case 1:
        return <Icon name="close" style={styles.tileX} />;
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />;
      default:
        return <View />;
    }
  };

  const onTilePress = (row, col) => {
    let currentGameBoard = gameBoard;
    if (currentGameBoard[row][col] !== 0) return;
    currentGameBoard[row][col] = playerTurn;
    setGameBoard(currentGameBoard);
    playerTurn === 1 ? setPlayerTurn(-1) : setPlayerTurn(1);
    let winner = checkWinState();
    if (winner === 1) {
      Alert.alert('Player 1 is the winner');
      initializeGame();
    } else if (winner === -1) {
      Alert.alert('Player 2 is the winner');
      initializeGame();
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.row,
          {borderBottomWidth: 1, borderColor: 'grey', paddingBottom: 20},
        ]}>
        <Image source={require('./assets/onair-logo.png')}></Image>
        <Text style={styles.logoText}>Tic Tac Toe</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.turnRowText}>{`Player ${
          playerTurn === 1 ? '1' : '2'
        } turn`}</Text>
      </View>
      <View style={styles.cellRow}>
        <TouchableWithoutFeedback onPress={() => onTilePress(0, 0)}>
          <View style={[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0}]}>
            {renderGamePiece(0, 0)}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onTilePress(0, 1)}>
          <View style={[styles.tile, {borderTopWidth: 0}]}>
            {renderGamePiece(0, 1)}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onTilePress(0, 2)}>
          <View style={[styles.tile, {borderRightWidth: 0, borderTopWidth: 0}]}>
            {renderGamePiece(0, 2)}
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.cellRow}>
        <TouchableWithoutFeedback onPress={() => onTilePress(1, 0)}>
          <View style={[styles.tile, {borderLeftWidth: 0}]}>
            {renderGamePiece(1, 0)}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onTilePress(1, 1)}>
          <View style={styles.tile}>{renderGamePiece(1, 1)}</View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onTilePress(1, 2)}>
          <View style={[styles.tile, {borderRightWidth: 0}]}>
            {renderGamePiece(1, 2)}
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.cellRow}>
        <TouchableWithoutFeedback onPress={() => onTilePress(2, 0)}>
          <View
            style={[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0}]}>
            {renderGamePiece(2, 0)}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onTilePress(2, 1)}>
          <View style={[styles.tile, {borderBottomWidth: 0}]}>
            {renderGamePiece(2, 1)}
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => onTilePress(2, 2)}>
          <View
            style={[styles.tile, {borderBottomWidth: 0, borderRightWidth: 0}]}>
            {renderGamePiece(2, 2)}
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View style={styles.btnRow}>
        <TouchableWithoutFeedback onPress={() => initializeGame()}>
          <View style={styles.btnContainer}>
            <Text style={styles.btnText}>Reset</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  logoText: {
    color: 'red',
    fontSize: 30,
    fontWeight: '800',
    marginLeft: 10,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  turnRowText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
  },
  tileX: {
    color: 'red',
    fontSize: 80,
  },
  tileO: {
    color: 'green',
    fontSize: 80,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 6,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#fff',
  },
  cellRow: {
    flexDirection: 'row',
  },
  btnContainer: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 30,
  },
  btnText: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fff',
  },
});

export default App;
