import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

function Profile({ navigation }) {
    const github_username = navigation.getParam('github_username');
    return (
        <WebView style={styles.webView} source={{uri: `http://github.com/${github_username}`}}>
              
        </WebView>
    );
}

const styles = StyleSheet.create({
    webView: {
        flex: 1,
    },
})

export default Profile;