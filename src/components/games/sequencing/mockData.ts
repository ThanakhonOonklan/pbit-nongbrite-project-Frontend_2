import { SequencingLevelData } from './types';

export const frogLifeCycleData: SequencingLevelData = {
  id: 'frog-lifecycle',
  theme: 'วงจรชีวิตของกบ',
  stages: [
    { id: 'egg', name: 'ไข่กบ', image: '/images/games/sequencing/frog-egg.svg', requireAction: 'time' },
    { id: 'tadpole', name: 'ลูกอ๊อด', image: '/images/games/sequencing/frog-tadpole.svg', requireAction: 'feed' },
    { id: 'froglet', name: 'ลูกอ๊อดมีขา', image: '/images/games/sequencing/frog-froglet.svg', requireAction: 'time' },
    { id: 'frog', name: 'กบตัวเต็มวัย', image: '/images/games/sequencing/frog-adult.svg', requireAction: 'none' },
  ],
  availableActions: [
    { id: 'time', label: 'รอเวลา', icon: '⏳' },
    { id: 'feed', label: 'ให้อาหาร', icon: '🪰' },
    { id: 'water', label: 'ให้น้ำ', icon: '💧' },
  ]
};
