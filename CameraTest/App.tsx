import React, { Fragment, Component } from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
//https://www.npmjs.com/package/react-native-image-picker
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fileBase64: '',
      fileUri: ''
    }
  }
  

  takePhoto = () => {
    let options = {
      mediaType:'photo',
      includeBase64:true
    };
    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('errorCode: ', response.errorCode);
      } else if(response.errorMessage){
        console.log('errorMessage: ', response.errorMessage);
      }else {
        let imageData =  response.assets[0];
        console.log(imageData);
        console.log('response', JSON.stringify(response));
        this.setState({
          fileBase64: imageData.base64,
          fileUri: imageData.uri
        });
      }
    });

  }

  pickImageFromGallery = () => {
    let options = {
      mediaType:'photo',
      includeBase64:true
    };
    
    launchImageLibrary(options, (response) => {
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('errorCode: ', response.errorCode);
      } else if(response.errorMessage){
        console.log('errorMessage: ', response.errorMessage);
      }else {
        let imageData =  response.assets[0];
        console.log(imageData);
        console.log('response', JSON.stringify(response));
        this.setState({
          fileBase64: imageData.base64,
          fileUri: imageData.uri
        });
      }
    });

  }

  renderFileBase64() {
    if (this.state.fileBase64) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + this.state.fileBase64 }}
        style={styles.images}
      />
    } else {
      return <Image source={require('./android/app/src/main/res/mipmap-hdpi/ic_launcher.png')}
        style={styles.images}
      />
    }
  }

  renderFileUri() {
    if (this.state.fileUri) {
      return <Image
        source={{ uri: this.state.fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./android/app/src/main/res/mipmap-hdpi/ic_launcher.png')}
        style={styles.images}
      />
    }
  }
  render() {
    return (
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {this.renderFileBase64()}
                <Text  style={{textAlign:'center'}}>Base 64</Text>
              </View>
              <View>
                {this.renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              <TouchableOpacity onPress={this.takePhoto} style={styles.btnSection}  >
                <Text style={styles.btnText}>Chụp ảnh</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={this.pickImageFromGallery} style={styles.btnSection}  >
                <Text style={styles.btnText}>Chọn ảnh</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
});