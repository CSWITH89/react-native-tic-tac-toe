import React, {useState, useEffect} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const App = () => {
  const [playerTurn, setPlayerTurn] = useState(1);
  const [gameBoard, setGameBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const initializeGame = () => {
    setGameBoard([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.turnRow}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  turnRow: {
    marginBottom: 20,
  },
  turnRowText: {
    fontSize: 30,
    fontWeight: '800',
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 6,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRow: {
    flexDirection: 'row',
  },
});

export default App;
