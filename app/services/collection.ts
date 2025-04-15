import API from './api';

export const fetchCollections = async (): Promise<any[]> => {
  const response = await API.get('/collections');
  return response.data;
};

export const createCollection = async (collectionData: any): Promise<any> => {
  const response = await API.post('/collections', collectionData);
  return response.data;
};

export const updateCollection = async (id: string, collectionData: any): Promise<any> => {
  const response = await API.put(`/collections/${id}`, collectionData);
  return response.data;
};

export const deleteCollection = async (id: string): Promise<void> => {
  await API.delete(`/collections/${id}`);
};