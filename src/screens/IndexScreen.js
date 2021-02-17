import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import { Context } from '../context/BlogContext';
import { AntDesign} from '@expo/vector-icons';
import { FontAwesome} from '@expo/vector-icons';

const IndexScreen = ({navigation}) => {
    const {state, addBlogPost, deleteBlogPost} = useContext(Context);
  return <View> 
      <Button title='Add Post' onPress={addBlogPost}/>     
      <FlatList 
        data={state}
        keyExtractor={blogpost => blogpost.title}
        renderItem={({item})=>{
            return <TouchableOpacity onPress={()=> navigation.navigate('Show',{id: item.id})}>
              <View style={styles.flatView}>
                <Text style={styles.title}>{item.title} - {item.id} </Text>
                <TouchableOpacity onPress={()=>deleteBlogPost(item.id)}>
                  <FontAwesome style={styles.icon} name='trash'/>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
        }}
        />
  </View>;
};

IndexScreen.navigationOptions = ({navigation}) =>{
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate('Create')}>
        <AntDesign name="pluscircleo" size={30} />
      </TouchableOpacity>
    )
  };
}


const styles = StyleSheet.create({
  flatView:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  title:{
    fontSize: 18
  },
  icon:{
    fontSize: 24
  }
});
export default IndexScreen;