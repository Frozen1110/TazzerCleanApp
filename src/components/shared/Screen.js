import React, { useMemo } from 'react';
import {
  Animated,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  View,
  Platform,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Theme } from '~/styles';
import { Notification, Loading } from '..';

const HEADER_MAX_HEIGHT = 0;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 100 : 70;
const HEADER_SCROLL_DISTANCE = HEADER_MIN_HEIGHT - HEADER_MAX_HEIGHT;
const windowHeight = Dimensions.get('window').height;
const Content = ({ hasList, align, children }) => {
  const alignStyle = useMemo(() => {
    switch (align) {
      case 'top':
        return styles.alignTop;
      case 'center':
        return styles.alignCenter;
      case 'bottom':
        return styles.alignBottom;
    }
    return null;
  }, [align]);

  return hasList ? (
    <View style={[{ flex: 1, backgroundColor: 'white' }, alignStyle]}>
      {children}
    </View>
  ) : (
    <ScrollView
      alwaysBounceVertical={false}
      keyboardShouldPersistTaps="always"
      style={{ flex: 1 }}
      contentContainerStyle={[styles.container, alignStyle]}>
      {children}
    </ScrollView>
  );
};

class CustomKeyBoardAvoidingView extends React.Component {
  render() {
    const { keyboardAware, children } = this.props;
    if (keyboardAware) {
      return (
        <KeyboardAwareScrollView {...this.props} keyboardShouldPersistTaps="handled">
          {children}
        </KeyboardAwareScrollView>
      );
    } else {
      return (
        <KeyboardAvoidingView {...this.props}>{children}</KeyboardAvoidingView>
      );
    }
  }
}

class AnimatedHeader extends React.Component {
  constructor(props) {
    super(props);

    const { statusBar, backgroundImage } = props;

    this.defaultBarStyle = statusBar
      ? statusBar
      : backgroundImage
      ? 'light-content'
      : 'dark-content';

    this.state = {
      scrollY: new Animated.Value(0),
      currentBarStyle: this.defaultBarStyle,
    };
  }

  setBarStyle = (barStyle) => {
    this.setState({
      currentBarStyle: barStyle ? barStyle : this.defaultBarStyle,
    });
  };

  render() {
    const { headerOverLayAlwaysVisible } = this.props;

    const headerHeight = headerOverLayAlwaysVisible
      ? HEADER_MIN_HEIGHT
      : this.state.scrollY.interpolate({
          inputRange: [0, HEADER_SCROLL_DISTANCE],
          outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
          extrapolate: 'clamp',
        });

    const { currentBarStyle } = this.state;

    return (
      <View style={[styles.fill]}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={[styles.fill]}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            {
              useNativeDriver: false,
              listener: (event) => {
                const offsetY = event.nativeEvent.contentOffset.y;
                // do something special
                this.setBarStyle(
                  offsetY > HEADER_MIN_HEIGHT / 2 ? 'light-content' : false,
                );
              },
            },
          )}>
          <View style={{ flex: 1 }}>{this.props.children}</View>
        </ScrollView>
        <Animated.View style={[styles.header, { height: headerHeight }]}>
          <LinearGradient
            colors={['rgba(0,0,0,1)', 'rgba(0,0,0,0)', 'rgba(256,256,256,0)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            locations={[0, 0.8, 1]}
            useAngle
            angle={180}
            style={{ flex: 1 }}>
            <StatusBar barStyle={currentBarStyle} />
          </LinearGradient>
        </Animated.View>
      </View>
    );
  }
}

export const Screen = ({
  align = 'top',
  backgroundImage = null,
  hasList = false,
  isLoading = false,
  statusBar = null,
  fullScreen = false,
  showHeaderOverLayOnScroll = false,
  headerOverLayAlwaysVisible = false,
  backgroundColor = '#fff',
  stickyBottom = false,
  stickyHeader = false,
  children,
  keyboardAware = false,
  messageInputKeyboardAware = false,
}) =>
  showHeaderOverLayOnScroll || headerOverLayAlwaysVisible ? (
    <View style={[styles.rootContainer, { backgroundColor: backgroundColor }]}>
      
      <AnimatedHeader
        statusBar={statusBar}
        backgroundImage={backgroundImage}
        headerOverLayAlwaysVisible={headerOverLayAlwaysVisible}>
        {backgroundImage ? (
          <ImageBackground
            source={backgroundImage}
            style={styles.imageBackground}>
              
            <View style={styles.overlay} />
            <CustomKeyBoardAvoidingView
              keyboardAware={keyboardAware}
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={[styles.container, fullScreen && styles.fullScreen]}>
              <Notification />
              {isLoading && <Loading />}
              <Content hasList={hasList} align={align}>
                {children}
              </Content>
            </CustomKeyBoardAvoidingView>
          </ImageBackground>
        ) : (
          
          <CustomKeyBoardAvoidingView
            keyboardAware={keyboardAware}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, fullScreen && styles.fullScreen]}>
            <Notification />
            {isLoading && <Loading />}
            <Content hasList={hasList} align={align}>
              {children}
             
            </Content>
          </CustomKeyBoardAvoidingView>
        )}
      </AnimatedHeader>
      {stickyBottom && stickyBottom}
    </View>
  ) : messageInputKeyboardAware == true ? 
  ( 
    <KeyboardAwareScrollView style={[styles.rootContainer,fullScreen && styles.fullScreen, { backgroundColor: backgroundColor }]} 
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>    
    <SafeAreaView
      style={[styles.rootContainer, { backgroundColor: backgroundColor }]}>
      <StatusBar
        barStyle={
          statusBar
            ? statusBar
            : backgroundImage
            ? 'light-content'
            : 'dark-content'
        }
      />     
      <CustomKeyBoardAvoidingView
        keyboardAware={keyboardAware}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.container, {height:(windowHeight - Theme.header.height - 100) }, fullScreen && styles.fullScreen]}>
        <Notification />
        {isLoading && <Loading />}
        <Content hasList={hasList} align={align}>
          {children}
        </Content>                
      </CustomKeyBoardAvoidingView>   
      {stickyBottom && stickyBottom}       
      </SafeAreaView>  
    </KeyboardAwareScrollView>
  ) :
  ( 
    // <KeyboardAwareScrollView keyboardAware={true} style={[styles.rootContainer, { backgroundColor: backgroundColor }]} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
    <SafeAreaView
      style={[styles.rootContainer, { backgroundColor: backgroundColor }]}>
      <StatusBar
        barStyle={
          statusBar
            ? statusBar
            : backgroundImage
            ? 'light-content'
            : 'dark-content'
        }
      />
      {stickyHeader && stickyHeader}
      {backgroundImage ? (
        <ImageBackground
          source={backgroundImage}
          style={styles.imageBackground}>
          <View style={styles.overlay} />
          <CustomKeyBoardAvoidingView
            keyboardAware={keyboardAware}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.container, fullScreen && styles.fullScreen]}>
            <Notification />
            {isLoading && <Loading />}
            <Content hasList={hasList} align={align}>
              {children}
            </Content>
          </CustomKeyBoardAvoidingView>
        </ImageBackground>
      ) : (
        <CustomKeyBoardAvoidingView
          keyboardAware={keyboardAware}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.container, fullScreen && styles.fullScreen]}>
          <Notification />
          {isLoading && <Loading />}
          <Content hasList={hasList} align={align}>
            {children}
          </Content>
        </CustomKeyBoardAvoidingView>
      )}   
      {stickyBottom && stickyBottom}     
    </SafeAreaView>
      // </KeyboardAwareScrollView>
  );

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // backgroundColor: '#ccc',
    // opacity: 0.45,
    overflow: 'hidden',
  },
  bar: {
    marginTop: 28,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },

  rootContainer: {
    backgroundColor: 'white',
    flex: 1,
  },

  container: {
    flex: 1,
  },

  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    opacity: 0.1,
    backgroundColor: 'black',
  },

  fullScreen: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },

  imageBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    height: Dimensions.get('window').height,
    resizeMode: 'contain',
  },

  alignCenter: {
    justifyContent: 'center',
  },
  alignTop: {
    justifyContent: 'flex-start',
  },
  alignBottom: {
    justifyContent: 'flex-end',
  },
});
