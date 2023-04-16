import axios from 'axios';

// get all post from https://indexer.crossbell.io/v1/characters/38333/feed?cursor=0&limit=20&includeCharacterMetadata=true
//  https://indexer.crossbell.io/v1/characters/38333/feed/follow?limit=20&type=POST_NOTE&includeCharacterMetadata=true
export async function getAllNotes(cursor=null, limit=10, includeCharacterMetadata=false) {
  const response = await axios.get(`https://indexer.crossbell.io/v1/characters/38333/feed/follow?limit=${limit}${cursor ? '&cursor=' + cursor : ''}&includeCharacterMetadata=${includeCharacterMetadata}`);

  return {
    list: response.data.list.map(item => {
      return {
        title: item.note.metadata.content.title,
        author: item.note.character.metadata.content.name,
        content: item.note.metadata.content.content,
        time: item.note.createdAt,
        tags: item.note.metadata.content.tags 
      };
    }),
    cursor: response.data.cursor
  };
}

// get notes of character 
export function getNotesByCharacter(id, cursor=0, limit=20, includeCharacterMetadata=false) {
  return axios.get(`https://indexer.crossbell.io/v1/characters/${id}/feed?cursor=${cursor}&limit=${limit}&includeCharacterMetadata=${includeCharacterMetadata}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
}

