import { View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { Text, Appbar, Button } from 'react-native-paper';
import { useAppContext } from '../context/AppContext';
import { Link, useRouter } from 'expo-router';

export default function ProfileScreen() {
  const { profile, items } = useAppContext();
  const router = useRouter();
  const spotlightItems = items.filter(item =>
    profile.spotlightItems.includes(item.id)
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileContent}>
        <Image
          source={{ uri: profile.avatar || 'https://i.imgur.com/oaEqEdn_d.webp' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.username}>@{profile.username}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        <Button 
          mode="contained" 
          style={styles.editButton}
          onPress={() => router.push('../components/manage-profile')}
        >
          Edit Profile
        </Button>

        <Text style={styles.spotlightTitle}>MY SPOTLIGHT</Text>

        <FlatList
          horizontal
          data={spotlightItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.spotlightItem}>
                <Link href={`../items/${item.id}`}>
                <Image source={{ uri: item.image }} style={{ width: 200, height: 200, borderRadius: 20 }} />
                </Link>

            </View>
          )}
          contentContainerStyle={styles.spotlightList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F7F4',
    paddingTop: 30,
  },
  header: {
    backgroundColor: '#191f1b',
  },
  headerTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileContent: {
    padding: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#7E8D85',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#191f1b',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7E8D85',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    color: '#3C493F',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  editButton: {
    alignSelf: 'center',
    backgroundColor: '#7E8D85',
    marginBottom: 24,
  },
  buttonLabel: {
    color: 'white',
  },
  spotlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7E8D85',
    marginBottom: 16,
    marginLeft: 8,
  },
  spotlightList: {
    paddingHorizontal: 16,
  },
  spotlightItem: {
    width: 150,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 8,
    marginRight: 16,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#7E8D85',
  },
  spotlightItemTitle: {
    color: '#3C493F',
    textAlign: 'center',
  },
});