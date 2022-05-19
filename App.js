import React, { useState } from 'react';
import { 
  StyleSheet,
  View, 
  Button, 
  TextInput,
  FlatList,
  Keyboard 
  } from 'react-native';
import PrevisaoItem from './components/PrevisaoItem';

export default function App() {
  const endpoint = "https://api.openweathermap.org/data/2.5/forecast?lang=pt&units=metric&q=";
  const apiKey = '36e19a1e56b157520c4d7664682f416d';

  const [cidade, setCidade] = useState('');
  const capturarCidade = (cidade) =>{
    setCidade(cidade)
  }

  const[previsoes, setPrevisoes] = useState([]);

  const obtemPrevisoes = () =>{
    setPrevisoes([]);
    const target = endpoint + cidade + "&appid=" + apiKey;
    console.log(target);
    fetch(target)
    .then((dados => dados.json()))
    .then(dados => {
      setPrevisoes(dados['list'])
      Keyboard.dismiss()
    })
  }

  return (
    <View style={styles.container}>
    <TextInput 
      style={styles.nomeCidade}
      accessibilityLabel="Campo para digitar o nome da cidade"
      placeHolder="Digite o nome da cidade"
      value={cidade}
      onChangeText={capturarCidade}
    />
    <Button 
      color="pink"
      title="Ok"
      onPress={obtemPrevisoes}

    />

    <FlatList 
    data={previsoes}
    renderItem={
    previsao => (
      <PrevisaoItem previsao={previsao}> 
      </PrevisaoItem>
    )
    }
    />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 48,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  nomeCidade:{
    padding: 10,
    borderBottomColor: 'pink',
    borderBottomWidth: 4,
    marginBottom: 4,
    textAlign: 'center',
    backgroundColor: '#e4e4e4',
    fontStyle: 'italic',
  },
});
