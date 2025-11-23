import { Stack } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Logger from '../services/Logger';

export default function LogsScreen() {
  const [logs, setLogs] = useState('');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const content = await Logger.getLogs();
    setLogs(content);
  };

  const handleClearLogs = async () => {
    await Logger.clearLogs();
    setLogs('');
  };

  const handleShareLogs = async () => {
    try {
      await Share.share({
        message: logs,
        title: 'App Logs',
      });
    } catch (error) {
      Logger.error(`Error sharing logs: ${error}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: 'System Logs', headerBackTitle: 'Back' }} />
      <View style={styles.header}>
        <Text style={styles.title}>System Logs</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={[styles.button, styles.shareButton]} onPress={handleShareLogs}>
            <Text style={styles.buttonText}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={handleClearLogs}>
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.logsContainer}>
        <Text style={styles.logText}>{logs || 'No logs found.'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  shareButton: {
    backgroundColor: '#007AFF',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f5f5f5',
  },
  logText: {
    fontFamily: 'monospace',
    fontSize: 12,
    color: '#333',
  },
});
