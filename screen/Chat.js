import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZE, icons, image } from '../constants';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import * as ImagePicker from 'expo-image-picker';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");

    const handleInput = (text) => {
        setInputMessage(text);
    }

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            Alert.alert('Permission refusée', 'Vous devez autoriser l\'accès aux photos pour choisir une image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
            const imageMessage = {
                _id: Math.random().toString(36).substr(2, 9),
                image: result.uri,
                createdAt: new Date(),
                user: {
                    _id: 1
                }
            };
            setMessages((previousMessages) => GiftedChat.append(previousMessages, [imageMessage]));
        }
    }

    const renderMessage = (props) => {
        const { currentMessage } = props;
        const isCurrentUser = currentMessage.user._id === 1;
        return (
            <View style={[styles.messageContainer, isCurrentUser && styles.currentUserMessage]}>
                <Bubble
                    {...props}
                    wrapperStyle={{
                        right: isCurrentUser ? { backgroundColor: "#3017e8" } : { backgroundColor: "#F5F5F5" }
                    }}
                    textStyle={{
                        right: { color: isCurrentUser ? "white" : "#000" }
                    }}
                />
                {isCurrentUser && (
                    <TouchableOpacity onPress={() => wteMessage(currentMessage._id)} style={styles.trashIcon}>
                        <FontAwesome name="trash-o" size={24} color="#FF0000" />
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    const sendMessage = () => {
        const newMessage = {
            _id: Math.random().toString(36).substr(2, 9),
            text: inputMessage,
            createdAt: new Date(),
            user: {
                _id: 1
            }
        };
        setMessages((previousMessages) => GiftedChat.append(previousMessages, [newMessage]));
        setInputMessage("");
    }

    const onDeleteMessage = (messageId) => {
        Alert.alert(
            'Supprimer le message',
            'Êtes-vous sûr de vouloir supprimer ce message ?',
            [
                {
                    text: 'Annuler',
                    style: 'cancel'
                },
                {
                    text: 'Supprimer',
                    onPress: () => {
                        const updatedMessages = messages.filter(message => message._id !== messageId);
                        setMessages(updatedMessages);
                    },
                    style: 'destructive'
                }
            ]
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            {/* Header personnalisé */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Image source={icons.back} resizeMode='contain' style={styles.backIcon} />
                </TouchableOpacity>
                <View style={styles.userInfo}>
                    <Image source={image.isma} resizeMode='contain' style={styles.userAvatar} />
                    <View style={styles.userInfoText}>
                        <Text style={styles.username}>Ismael</Text>
                        <Text style={styles.status}>Actif</Text>
                    </View>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity style={styles.iconButton} onPress={handleImagePick}>
                        <Feather name="camera" size={24} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="video" size={24} color="grey" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Feather name="phone" size={24} color="grey" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Chat */}
            <GiftedChat
                messages={messages}
                onSend={sendMessage}
                user={{ _id: 1 }}
                renderBubble={renderMessage}
                renderInputToolbar={() => { return null }}
                minInputToolbarHeight={0}
            />

            {/* Input message */}
            <View style={styles.inputContainer}>
                <View style={styles.inputMessage}>
                    <TextInput
                        style={styles.input}
                        placeholder='Saisissez votre message...'
                        placeholderTextColor={"grey"}
                        value={inputMessage}
                        onChangeText={handleInput}
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                        <FontAwesome name="send" size={22} color={"#3017e8"} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 24,
        backgroundColor: "white",
        borderBottomColor: "grey",
        borderBottomWidth: 2
    },
    backButton: {
        marginLeft: 12,
    },
    backIcon: {
        height: 25,
        width: 25,
        tintColor: "#000"
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
    },
    userAvatar: {
        height: 48,
        width: 48,
        borderRadius: 5
    },
    userInfoText: {
        marginLeft: 16,
    },
    username: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    status: {
        fontSize: 12,
        color: "green"
    },
    headerIcons: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: 16
    },
    iconButton: {
        marginHorizontal: 16
    },
    inputContainer: {
        backgroundColor: "white",
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputMessage: {
        height: 54,
        width: SIZE.width - 48,
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
        borderRadius: 16,
        alignItems: "center",
        borderColor: "rgba(128,128,128,.4)",
        borderWidth: 1
    },
    input: {
        color: "#000",
        flex: 1,
        paddingHorizontal: 10
    },
    sendButton: {
        backgroundColor: "white",
        padding: 4,
        borderRadius: 999,
        marginHorizontal: 6
    },
    imageContainer: {
        alignItems: "flex-end",
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    currentUserMessage: {
        flexDirection: 'row-reverse',
    },
    trashIcon: {
        marginHorizontal: 8,
        marginLeft : 25
    },
});

export default Chat;
