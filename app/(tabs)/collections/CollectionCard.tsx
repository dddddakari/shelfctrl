import { StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

interface Collection {
  image?: string;
  title: string;
  itemsCount: number;
}

interface CollectionCardProps {
  collection: Collection;
  onPress: () => void;
}

const CollectionCard = ({ collection, onPress }: CollectionCardProps) => {
  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Cover source={{ uri: collection.image || 'https://placehold.co/600x400' }} />
      <Card.Content>
        <Title>{collection.title}</Title>
        <Paragraph>{collection.itemsCount} items</Paragraph>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
});

export default CollectionCard;