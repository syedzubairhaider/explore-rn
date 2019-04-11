/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase'

// import type { Notification, NotificationOpen, RemoteMessage } from 'react-native-firebase'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

// type Props = {};
export default class App extends Component {

  async componentDidMount(){


    const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
  .setDescription('My apps test channel');

// Create the channel
firebase.notifications().android.createChannel(channel)

  //   firebase.messaging().hasPermission()
  // .then(enabled => {
  //   if (enabled) {
  //     // user has permissions
  //     alert('yes')
  //   } else {
  //     // user doesn't have permission
  //     alert('no')
  //   } 
  // })
  this.notificationDisplayedListener = firebase.notifications().onNotificationDisplayed((notification) => {
    console.log('onNotificationDisplayed: ', notification);
  })
this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
  // Get the action triggered by the notification being opened
  const action = notificationOpen.action;
  console.log('onNotificationOpened action: ', action);
  // Get information about the notification that was opened
  const notification = notificationOpen.notification;
  console.log('onNotificationOpened notification: ', notification);
  // alert('onNotificationOpened')
})

  const notification = new firebase.notifications.Notification()
  .setTitle('Android Notification Actions')
  .setBody('Action Body')
  .setNotificationId('notificationId')
  .setSound('default')
  .setData({
    key1: 'value1',
    key2: 'value2',
  })
  .android.setChannelId('test-channel')
  .android.setSmallIcon('ic_launcher')
  .android.setPriority(firebase.notifications.Android.Priority.Max);
// // Build an action
const action = new firebase.notifications.Android.Action('test_action', 'ic_launcher', 'My Test Action');
// Add the action to the notification
notification.android.addAction(action);

  notification
  .android.setChannelId('test-channel')
  .android.setSmallIcon('ic_launcher')

  firebase.notifications().displayNotification(notification)
  }


  componentWillUnmount() {
    // this.messageListener();

    this.notificationDisplayedListener();
    this.notificationListener()
    this.notificationOpenedListener()
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
