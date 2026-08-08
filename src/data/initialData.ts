import { Soundscape, Stretch, Recommendation, UserProfile, MoodLog, JournalEntry } from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Sayandeep',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCrgISYUXGBvyHd0-vGD-ji6iRPLZqavL3N7wWlaoaiNf97NAh1KzAKUWVbCFf2lY-Nc_jBAgUsNul4s4I-jIo9fOFXHs6VycKIhMTCW0UbvhOSg8dtSyVCJbKzakCOladXlOuG9Bqg8wKjRM-fsQtPSIuLt3aiddvI5F1XY6_9ZprZ29E3rMlsl94FFCXBRjfsOb114cr0SopfdVQRMJ9nSBLlGFpczc2A1CzmYNpQdESKzZ4swMwE',
  dailyGoalMinutes: 50,
  streakDays: 4,
  totalMindfulMinutes: 145,
};

export const defaultStretches: Stretch[] = [
  {
    id: 'neck-rolls',
    title: 'Neck Rolls',
    description: 'Gently roll your neck from side to side to release tension built up from focusing.',
    duration: '2 min',
    category: 'Post-Focus Relief',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9srrTLv3JlAKzuhFi5MLMBJj30XxVN2bkhH8lnbNNWSr-tedkPQS2KnlYPI46UzHEuuZW-mvPiVXt4NcQsAM0-DVvDbn0eOdal3H0B_V6966t-OfQ6CB5EthCXBoQPq1Fg9gjBEr21aX1D61fBddLCGVN4biH2NLKS44cHJPi4vY-x2B_Pr4uTaL4TunAAzryN6U0LqbHmieSBUabw0xxo-uMQ9I0DXKTqTW4gs468e2KRd-R9MOA',
    steps: [
      'Sit comfortably with your back straight and shoulders relaxed.',
      'Drop your chin toward your chest gently.',
      'Slowly roll your right ear toward your right shoulder.',
      'Pause for 5 seconds, breathing deeply.',
      'Slowly roll back down and repeat on the left side.'
    ]
  },
  {
    id: 'shoulder-shrugs',
    title: 'Shoulder & Upper Back Reset',
    description: 'Inhale to roll your shoulders up toward your ears and drop them on a deep exhale.',
    duration: '3 min',
    category: 'Desk Tension',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9srrTLv3JlAKzuhFi5MLMBJj30XxVN2bkhH8lnbNNWSr-tedkPQS2KnlYPI46UzHEuuZW-mvPiVXt4NcQsAM0-DVvDbn0eOdal3H0B_V6966t-OfQ6CB5EthCXBoQPq1Fg9gjBEr21aX1D61fBddLCGVN4biH2NLKS44cHJPi4vY-x2B_Pr4uTaL4TunAAzryN6U0LqbHmieSBUabw0xxo-uMQ9I0DXKTqTW4gs468e2KRd-R9MOA',
    steps: [
      'Inhale deeply and pull both shoulders straight up to your ears.',
      'Hold the tension for 3 seconds.',
      'Release sharply on a full breath out.',
      'Repeat 5 times, followed by gentle backward shoulder circles.'
    ]
  },
  {
    id: 'eye-palming',
    title: 'Warm Palm Eye Resting',
    description: 'Cup your palms gently over closed eyes to soothe digital screen fatigue.',
    duration: '2 min',
    category: 'Screen Fatigue',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9srrTLv3JlAKzuhFi5MLMBJj30XxVN2bkhH8lnbNNWSr-tedkPQS2KnlYPI46UzHEuuZW-mvPiVXt4NcQsAM0-DVvDbn0eOdal3H0B_V6966t-OfQ6CB5EthCXBoQPq1Fg9gjBEr21aX1D61fBddLCGVN4biH2NLKS44cHJPi4vY-x2B_Pr4uTaL4TunAAzryN6U0LqbHmieSBUabw0xxo-uMQ9I0DXKTqTW4gs468e2KRd-R9MOA',
    steps: [
      'Rub your palms together vigorously until warm.',
      'Close your eyes and cup your hands over them without pressing your eyes.',
      'Breathe slowly into the soothing darkness for 60 seconds.',
      'Gently open your eyes into your hands before releasing.'
    ]
  }
];

export const soundscapesList: Soundscape[] = [
  {
    id: 'quick-refreshes',
    title: 'Quick Refreshes',
    description: 'Rapid grounding techniques for between classes.',
    category: 'Quick Refreshes',
    duration: '3 MIN',
    icon: 'bolt',
    type: 'rain'
  },
  {
    id: 'focus-soundscapes',
    title: 'Focus Soundscapes',
    description: 'Ambient noise to block out distractions in busy study areas.',
    category: 'Focus Soundscapes',
    duration: 'LOOPS',
    icon: 'headphones',
    type: 'library'
  },
  {
    id: 'deep-rest',
    title: 'Deep Rest & Recovery',
    description: 'Guided sessions to alleviate academic burnout and reset your nervous system after intense focus periods.',
    category: 'Deep Rest & Recovery',
    duration: '10-20 MIN',
    icon: 'nightlight',
    type: 'binaural'
  }
];

export const initialRecommendations: Recommendation[] = [
  {
    id: 'rec-1',
    title: '5-min Eye Rest',
    subtitle: 'Screen fatigue relief',
    icon: 'visibility',
    soundscapeId: 'quick-refreshes',
    duration: '5 min'
  },
  {
    id: 'rec-2',
    title: 'Ambient Library Noises',
    subtitle: 'Focus soundscape',
    icon: 'menu_book',
    soundscapeId: 'focus-soundscapes',
    duration: 'Loop'
  },
  {
    id: 'rec-3',
    title: 'Graduation Stress Relief',
    subtitle: 'Guided reflection',
    icon: 'school',
    soundscapeId: 'deep-rest',
    duration: '12 min'
  }
];

// Seed initial mood calendar logs for October 2023 / current month matching screenshot
export const initialMoodLogs: MoodLog[] = [
  { id: 'm1', date: '2023-10-01', mood: 'calm', timestamp: Date.now() - 86400000 * 9 },
  { id: 'm2', date: '2023-10-02', mood: 'focused', timestamp: Date.now() - 86400000 * 8 },
  { id: 'm3', date: '2023-10-03', mood: 'calm', timestamp: Date.now() - 86400000 * 7 },
  { id: 'm4', date: '2023-10-04', mood: 'tired', timestamp: Date.now() - 86400000 * 6 },
  { id: 'm5', date: '2023-10-05', mood: 'anxious', timestamp: Date.now() - 86400000 * 5 },
  { id: 'm6', date: '2023-10-06', mood: 'calm', timestamp: Date.now() - 86400000 * 4 },
  { id: 'm7', date: '2023-10-07', mood: 'calm', timestamp: Date.now() - 86400000 * 3 },
  { id: 'm8', date: '2023-10-08', mood: 'focused', timestamp: Date.now() - 86400000 * 2 },
  { id: 'm10', date: '2023-10-10', mood: 'calm', note: 'Feeling centered after a quiet morning walk.', timestamp: Date.now() }
];

export const initialJournalEntries: JournalEntry[] = [
  {
    id: 'j1',
    date: '2023-10-10',
    text: 'Grateful for quiet study spaces and taking structured breaks between classes.',
    moodTag: 'calm',
    aiReflection: 'Observing peace in small moments strengthens your mental endurance during busy seasons.',
    createdAt: Date.now() - 3600000
  },
  {
    id: 'j2',
    date: '2023-10-08',
    text: 'Completed 2 deep focus blocks on my research thesis. Mind feels sharp and steady.',
    moodTag: 'focused',
    aiReflection: 'Consistency breeds momentum. Celebrate every chunk of deep focus you finish.',
    createdAt: Date.now() - 86400000 * 2
  }
];
