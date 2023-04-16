import axios from 'axios';

const sourceType = {
  discord: 'discord server: '
}
const defaultCharacterID = 38333;

// get all post from https://indexer.crossbell.io/v1/characters/38333/feed?cursor=0&limit=20&includeCharacterMetadata=true
//  https://indexer.crossbell.io/v1/characters/38333/feed/follow?limit=20&type=POST_NOTE&includeCharacterMetadata=true
export async function getAllNotes(cursor=null, limit=10, includeCharacterMetadata=false) {
  const response = await axios.get(`https://indexer.crossbell.io/v1/characters/${import.meta.env.VITE_CHARCTER_ID || defaultCharacterID}/feed/follow?limit=${limit}${cursor ? '&cursor=' + cursor : ''}&includeCharacterMetadata=${includeCharacterMetadata}`);
  return {
    list: response.data.list.filter(item => item.note).map(item => {
      const sources = JSON.parse(JSON.stringify(item.note.metadata.content.sources))
      const formalSource = {};
      if (sources[1].startsWith(sourceType.discord)) {
        formalSource.type = 'discord'
        formalSource.server = sources[1].substr(sourceType.discord.length);
      } else {
        formalSource.type = 'unknown'
        formalSource.server = sources[1];
      }
      formalSource.channel = sources[2].substr('channel: '.length);
      formalSource.url = item.note.metadata.content.external_urls.length ? item.note.metadata.content.external_urls[0] : null;

      return {
        title: item.note.metadata.content.title,
        author: item.note.character.metadata.content.name,
        content: item.note.metadata.content.content,
        time: item.note.createdAt,
        tags: item.note.metadata.content.tags,
        source: formalSource
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

