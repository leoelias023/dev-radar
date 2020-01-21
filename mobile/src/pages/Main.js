import React, { useEffect , useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, Button } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);
    const [devs, setDevs] = useState([]);
    const [techs, setTechs] = useState("");

    useEffect( () => {
        async function loadPositionOfUser() {
            const { granted } = await requestPermissionsAsync();
            if(granted) {
                const { coords } = await getCurrentPositionAsync({
                    enableHighAccuracy: true,
                });

                const { latitude , longitude } = coords;
                
                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.009,
                    longitudeDelta: 0.009,
                });


            }
        }

        loadPositionOfUser();
    } , []);

    async function loadDevs() {
        const {latitude, longitude} = currentRegion;

        const dev = await api.get('/search' , {
            params: {
                latitude,
                longitude,
                techs,
            }
        });
        
        setDevs(dev.data);
    }

    async function handleRegion(position) {
        setCurrentRegion(position);    
    }

    if(!currentRegion) {
        return null;
    }
    return (
        <>
            <MapView 
                onRegionChangeComplete={handleRegion}
                initialRegion={currentRegion} 
                style={styles.mapaDev}
            >
                {devs.map( (dev) => {
                    return (
                        <Marker key={dev._id} coordinate={{
                            latitude: dev.location.coordinates[1],
                            longitude: dev.location.coordinates[0],
                        }}>
                            <Image style={styles.imagePoint} source={{ uri: dev.avatar_url}} />
                            <Callout onPress={() => {
                                navigation.navigate('Profile', { github_username: dev.github_user });
                            }} style={styles.callout}>
                                <View style={styles.boxDev}>
                                    <Text style={styles.nomeDev}>{dev.github_user}</Text>
                                    <Text style={styles.techsDev}>{dev.techs.join(',')}</Text>
                                    <Text style={styles.bioDev}>
                                        {dev.bio}
                                </Text>
                                </View>
                            </Callout>
                        </Marker>
                    )
                })}
            </MapView>
            <View style={styles.boxNavigation}>
                <TextInput 
                    style={styles.inputDev}
                    placeholder="Procure devs por tecnologia..."
                    placeholderTextColor="#333"
                    value={techs}
                    autoCorrect={false}
                    onChangeText={(techsInput) => { setTechs(techsInput)}} // Aarrumar essa parte de tec
                />
                <TouchableOpacity onPress={loadDevs} style={styles.searchButton}>
                    <MaterialIcons name="my-location" size={40} color='rgb(147, 50, 168)' />
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    mapaDev: {
        flex: 1,
    },
    imagePoint: {
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    callout: {
        width: 300,
        minHeight: 'auto',
    },
    calloutOf: {
        width: 300,
        minHeight: 'auto',
        backgroundColor: 'red',
    },
    boxDev: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },  
    nomeDev: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    techsDev: {
        color: '#333',
        marginBottom: 10,
    },
    inputDev: {
        backgroundColor: '#fff',
        flex: 1,
        marginRight: 10,
        elevation: 2,
        borderRadius: 20,
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 10,
        paddingBottom: 10,
        color: '#333'
    },
    boxNavigation: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        flexDirection: 'row',
    },
    searchButton: {
        backgroundColor: '#fff',
        elevation: 3,
        padding: 10,
        borderRadius: 50,
    },
})

export default Main;