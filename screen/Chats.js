import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from "@expo/vector-icons";
import { SIZE, icons } from '../constants';
import { messagesData } from '../donnee/data'; // Import correct des données

const Chats = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilter] = useState(messagesData);

    const handleSearchChange = (text) => {
        setSearch(text);
        const filterData = messagesData.filter((user) =>
            user.fullName.toLowerCase().includes(text.toLowerCase())
        );
        setFilter(filterData);
    };

    const renderItem = ({ item, index }) => (
        <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("Chat", { utilisateur: item.fullName })}
            style={[
                style.userContainer,
                index % 2 === 0 ? style.oddBackground : null
            ]}>
            <View style={style.userImageContainer}>
                {item.isOnLive && (
                    <View style={style.onLineIndicator} />
                )}
                <Image
                    source={item.pic}
                    resizeMode='contain'
                    style={style.userImage}
                />
            </View>
            <View style={{ flexDirection: "row", width: SIZE.width - 104 }}>
                <View>
                    <Text style={style.userName}>{item.fullName}</Text>
                    <Text style={style.lastSeen}>{item.lastMessage}</Text>
                </View>
                <View style={{ position: "absolute", right: 4, alignItems: "center" }}>
                    <Text style={style.lastMessageTime}>{item.lastMessageTime}</Text>
                    <View>
                        <TouchableOpacity style={{
                            width: 20,
                            height: 20,
                            borderRadius: 10,
                            backgroundColor: item.messageInQueue ? "#3017e8" : "transparent",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 12
                        }}>
                            <Text style={style.messageInQueue}>{item.messageInQueue}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renduContenu = () => (
        <View style={{ marginBottom: 110 }}>
            <View style={style.searchBar}>
                <TouchableOpacity>
                    <Ionicons
                        name="search-outline"
                        size={24}
                        color={"#8a8994"} />
                </TouchableOpacity>
                <TextInput
                    style={style.searchInput}
                    placeholder='Tadiavo ilay olona ...'
                    value={search}
                    onChangeText={handleSearchChange}
                />
                <TouchableOpacity>
                    <Image
                        source={icons.edit}
                        resizeMode='contain'
                        style={{ width: 24, height: 24, tintColor: "#8a8994" }} />
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={filteredUsers}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        </View>
    );

    return (
        <SafeAreaView style={style.area}>
            <StatusBar hidden />
            <View style={style.container}>
                {renduContenu()}
            </View>
        </SafeAreaView>
    );
};

const style = StyleSheet.create({
    area: {
        flex: 1,
        backgroundColor: "white",
    },
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        width: SIZE.width - 32,
        height: 50,
        marginVertical: 22,
        paddingHorizontal: 12,
        borderRadius: 12
    },
    searchInput: {
        flex: 1,
        height: "100%",
        marginHorizontal: 12,
        backgroundColor: "white",
    },
    userContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "white",
        borderBottomWidth: 1
    },
    oddBackground: {
        backgroundColor: "white"
    },
    userImageContainer: {
        paddingVertical: 22,
        marginRight: 22
    },
    onLineIndicator: {
        height: 14,
        width: 14,
        borderRadius: 7,
        backgroundColor: "green",
        position: "absolute",
        top: 14,
        right: 2,
        zIndex: 999,
        borderWidth: 2,
        borderColor: "white"
    },
    userImage: {
        height: 50,
        width: 50,
        borderRadius: 25
    },
    userInfoContainer: {
        flexDirection: "column"
    },
    userName: {
        fontSize: 14,
        color: "black",
        marginBottom: 4
    },
    lastSeen: {
        fontSize: 14,
        color: "#8a8994"
    },
    lastMessageTime: {
        fontSize: 12,
        color: "black"
    },
    messageInQueue: {
        fontSize: 12,
        color: "#fff",
    }
});

export default Chats;
