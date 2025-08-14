// data/mockData.ts

export type Track = {
    id: string;
    title: string;
    artist: string;
    url: any;
    category: string;
    artwork: any;
  };
  
  export const suggestedSongs: Track[] = [
    {
      id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      url: require('../assets/sample-audio-1.mp3'),
      category: 'Pop',
      artwork: require('../assets/images/album-cover-1.png'),
    },
    {
      id: '2',
      title: 'As It Was',
      artist: 'Harry Styles',
      url: require('../assets/sample-audio-2.mp3'),
      category: 'Pop',
      artwork: require('../assets/images/album-cover-2.png'),
    },
    {
      id: '3',
      title: 'Anti-Hero',
      artist: 'Taylor Swift',
      url: require('../assets/sample-audio-3.mp3'),
      category: 'Pop',
      artwork: require('../assets/images/album-cover-3.png'),
    },
    {
      id: '4',
      title: 'Idol',
      artist: 'YOASOBI',
      url: require('../assets/sample-audio-4.mp3'),
      category: 'J-pop',
      artwork: require('../assets/images/album-cover-4.png'),
    },
    {
      id: '5',
      title: 'How You Like That',
      artist: 'BLACKPINK',
      url: require('../assets/sample-audio-5.mp3'),
      category: 'K-Pop',
      artwork: require('../assets/images/album-cover-5.png'),
    },
  ];
  
  export const suggestedArtists = [
    {
      id: '1',
      name: 'Lady Gaga',
      image: require('../assets/images/artist-1.png'),
    },
    {
      id: '2',
      name: 'Post Malone',
      image: require('../assets/images/artist-2.png'),
    },
    {
      id: '3',
      name: 'Rihanna',
      image: require('../assets/images/artist-3.png'),
    },
  ];
  
  export const suggestedCategories = [
      { id: '1', name: 'J-pop', color: '#E13300' },
      { id: '2', name: 'K-Pop', color: '#DC143C' },
      { id: '3', name: 'Rap', color: '#FFD700' },
      { id: '4', name: 'Country', color: '#BDB76B' },
      { id: '5', name: 'Pop', color: '#1E90FF' },
  ];
  