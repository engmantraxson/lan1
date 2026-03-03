import {
  Book, Coffee, Plane, Heart, Music, Utensils,
  Briefcase, Home, ShoppingCart, Sun, Moon, Star,
  Cloud, Umbrella, Zap, Snowflake, Flame, Droplet,
  Wind, Mountain, TreePine, Flower, Car, Bus,
  Train, Ship, Bike, Rocket, Laptop, Smartphone,
  Camera, Tv, Gamepad, Headphones, Mic, PenTool,
  Palette, Scissors, Hammer, Wrench, Stethoscope,
  Pill, Syringe, Microscope, Telescope, Atom,
  Globe, Map, Compass, Anchor, Flag, Shield,
  Swords, Target, Trophy, Medal, Crown,
  Diamond, Coins, Banknote, Wallet, CreditCard,
  Gift, Cake, IceCream, Pizza, Hamburger, Apple,
  Carrot, Fish, Bird, Dog, Cat, Smile,
  Leaf, Snail
} from 'lucide-react';

const icons = [
  Book, Coffee, Plane, Heart, Music, Utensils,
  Briefcase, Home, ShoppingCart, Sun, Moon, Star,
  Cloud, Umbrella, Zap, Snowflake, Flame, Droplet,
  Wind, Mountain, TreePine, Flower, Car, Bus,
  Train, Ship, Bike, Rocket, Laptop, Smartphone,
  Camera, Tv, Gamepad, Headphones, Mic, PenTool,
  Palette, Scissors, Hammer, Wrench, Stethoscope,
  Pill, Syringe, Microscope, Telescope, Atom,
  Globe, Map, Compass, Anchor, Flag, Shield,
  Swords, Target, Trophy, Medal, Crown,
  Diamond, Coins, Banknote, Wallet, CreditCard,
  Gift, Cake, IceCream, Pizza, Hamburger, Apple,
  Carrot, Fish, Bird, Dog, Cat, Smile,
  Leaf, Snail
];

const colors = [
  'bg-blue-500', 'bg-green-500', 'bg-red-500', 'bg-yellow-500',
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500',
  'bg-orange-500', 'bg-cyan-500', 'bg-lime-500', 'bg-emerald-500',
  'bg-fuchsia-500', 'bg-rose-500', 'bg-sky-500', 'bg-violet-500'
];

const baseTopics = [
  "Basics", "Greetings", "Travel", "Food", "Family",
  "Activities", "People", "Places", "Shopping", "School",
  "Work", "Hobbies", "Animals", "Nature", "Weather",
  "Emotions", "Health", "Body", "Clothes", "Colors",
  "Numbers", "Time", "Dates", "Directions", "Transport",
  "Home", "Furniture", "Tech", "Science", "Art",
  "Music", "Sports", "Politics", "Business", "Law",
  "Religion", "History", "Geography", "Culture", "Society",
  "Media", "Internet", "Space", "Fantasy", "Mystery"
];

const topicDescriptions: Record<string, string> = {
  "Basics": "Learn essential vocabulary and phrases for everyday communication.",
  "Greetings": "Master the art of saying hello, goodbye, and introducing yourself.",
  "Travel": "Navigate airports, hotels, and tourist attractions with ease.",
  "Food": "Order meals, understand menus, and discuss your favorite dishes.",
  "Family": "Talk about your relatives, relationships, and family tree.",
  "Activities": "Describe your daily routine and what you do in your free time.",
  "People": "Learn to describe physical appearances and personality traits.",
  "Places": "Identify common locations in a city and how to get there.",
  "Shopping": "Ask for prices, sizes, and make purchases confidently.",
  "School": "Discuss subjects, classrooms, and educational experiences.",
  "Work": "Talk about professions, offices, and your career.",
  "Hobbies": "Share your interests, sports, and recreational activities.",
  "Animals": "Learn the names of pets, farm animals, and wildlife.",
  "Nature": "Describe landscapes, plants, and the great outdoors.",
  "Weather": "Talk about the climate, seasons, and daily forecasts.",
  "Emotions": "Express your feelings, moods, and emotional states.",
  "Health": "Discuss symptoms, body parts, and visits to the doctor.",
  "Body": "Learn the vocabulary for different parts of the human body.",
  "Clothes": "Describe garments, accessories, and what you are wearing.",
  "Colors": "Identify and describe the colors of objects around you.",
  "Numbers": "Count, tell time, and use numbers in everyday situations.",
  "Time": "Learn to express hours, minutes, and times of the day.",
  "Dates": "Talk about days of the week, months, and years.",
  "Directions": "Ask for and give instructions on how to reach a destination.",
  "Transport": "Navigate public transit, cars, and other modes of travel.",
  "Home": "Describe rooms, furniture, and household items.",
  "Furniture": "Learn the names of common pieces of furniture.",
  "Tech": "Discuss computers, smartphones, and modern technology.",
  "Science": "Explore vocabulary related to scientific concepts and discoveries.",
  "Art": "Talk about paintings, sculptures, and creative expressions.",
  "Music": "Discuss genres, instruments, and your favorite songs.",
  "Sports": "Learn the rules, equipment, and terminology of various sports.",
  "Politics": "Understand basic political terms and governmental structures.",
  "Business": "Navigate the corporate world, meetings, and finance.",
  "Law": "Learn vocabulary related to the legal system and justice.",
  "Religion": "Discuss beliefs, practices, and spiritual concepts.",
  "History": "Talk about past events, eras, and historical figures.",
  "Geography": "Learn about countries, continents, and geographical features.",
  "Culture": "Explore traditions, customs, and cultural practices.",
  "Society": "Discuss social issues, communities, and civic life.",
  "Media": "Talk about news, television, movies, and entertainment.",
  "Internet": "Navigate the web, social media, and online communication.",
  "Space": "Explore vocabulary related to astronomy and the universe.",
  "Fantasy": "Discuss mythical creatures, magic, and imaginary worlds.",
  "Mystery": "Learn terms related to secrets, puzzles, and the unknown.",
};

const topicExamples: Record<string, string> = {
  "Basics": "e.g., 'Yes', 'No', 'Please', 'Thank you'",
  "Greetings": "e.g., 'Hello!', 'How are you?', 'Good morning'",
  "Travel": "e.g., 'Where is the airport?', 'I need a ticket'",
  "Food": "e.g., 'I would like an apple', 'The water is cold'",
  "Family": "e.g., 'My mother', 'His brother', 'Our family'",
  "Activities": "e.g., 'I read a book', 'She runs every day'",
  "People": "e.g., 'He is tall', 'She is very smart'",
  "Places": "e.g., 'The library is near', 'Let's go to the park'",
  "Shopping": "e.g., 'How much is this?', 'I will buy it'",
  "School": "e.g., 'The teacher is here', 'I have homework'",
  "Work": "e.g., 'I work in an office', 'She is a doctor'",
  "Hobbies": "e.g., 'I like to paint', 'He plays guitar'",
  "Animals": "e.g., 'The dog barks', 'A cat sleeps'",
  "Nature": "e.g., 'The tree is green', 'A beautiful flower'",
  "Weather": "e.g., 'It is raining', 'The sun is shining'",
  "Emotions": "e.g., 'I am happy', 'She feels sad'",
  "Health": "e.g., 'I have a headache', 'He is healthy'",
  "Body": "e.g., 'My eyes are blue', 'Raise your hand'",
  "Clothes": "e.g., 'A red shirt', 'These shoes are new'",
  "Colors": "e.g., 'The sky is blue', 'A yellow car'",
  "Numbers": "e.g., 'One, two, three', 'I have five apples'",
  "Time": "e.g., 'It is 3 o'clock', 'See you tomorrow'",
  "Dates": "e.g., 'Monday', 'January 1st', 'Next year'",
  "Directions": "e.g., 'Turn left', 'Go straight ahead'",
  "Transport": "e.g., 'Take the bus', 'Drive a car'",
  "Home": "e.g., 'My house is big', 'The kitchen'",
  "Furniture": "e.g., 'A comfortable sofa', 'The wooden table'",
  "Tech": "e.g., 'My phone is ringing', 'Use the computer'",
  "Science": "e.g., 'Water boils at 100 degrees', 'Gravity'",
  "Art": "e.g., 'A beautiful painting', 'Modern art'",
  "Music": "e.g., 'Listen to the song', 'Play the piano'",
  "Sports": "e.g., 'Play soccer', 'Win the game'",
  "Politics": "e.g., 'The president', 'Vote in the election'",
  "Business": "e.g., 'A new company', 'Sign the contract'",
  "Law": "e.g., 'It is illegal', 'The judge decided'",
  "Religion": "e.g., 'Pray in the temple', 'Spiritual beliefs'",
  "History": "e.g., 'In the 19th century', 'An ancient empire'",
  "Geography": "e.g., 'The highest mountain', 'A deep ocean'",
  "Culture": "e.g., 'Traditional dance', 'A local festival'",
  "Society": "e.g., 'The community', 'Social rules'",
  "Media": "e.g., 'Watch the news', 'Read a newspaper'",
  "Internet": "e.g., 'Send an email', 'Search online'",
  "Space": "e.g., 'The moon is bright', 'A distant planet'",
  "Fantasy": "e.g., 'A flying dragon', 'Magic spells'",
  "Mystery": "e.g., 'A secret code', 'Solve the puzzle'",
};

const levels = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export const generateTopics = (count: number) => {
  const topics = [];
  for (let i = 0; i < count; i++) {
    const base = baseTopics[i % baseTopics.length];
    const levelIndex = Math.floor(i / baseTopics.length) % levels.length;
    const level = levels[levelIndex];
    const title = i >= baseTopics.length ? `${base} ${level}` : base;
    const description = topicDescriptions[base] || `Learn more about ${base.toLowerCase()}.`;
    const example = topicExamples[base] || `e.g., 'Example for ${base.toLowerCase()}'`;
    
    const completed = i < 5;
    const locked = i > 6;
    const progress = completed ? 100 : locked ? 0 : (i * 37) % 100;
    
    const difficulty = levelIndex < 3 ? 'easy' : levelIndex < 6 ? 'medium' : 'hard';
    
    topics.push({
      id: `topic-${i + 1}`,
      title,
      description,
      example,
      difficulty,
      icon: icons[i % icons.length],
      color: colors[i % colors.length],
      completed,
      locked,
      progress
    });
  }
  return topics;
};

export const allTopics = generateTopics(500);
