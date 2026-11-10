export type ScreenId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface TrainCarItem {
  id: string;
  value: string | number | boolean;
  type: 'int' | 'str' | 'float' | 'bool';
  color: string;
}

export interface StudentScore {
  id: number;
  name: string;
  score: number;
}

export interface BadgeStatus {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface TeacherSettings {
  soundEnabled: boolean;
  classroomMode: boolean; // Large font projection mode
  hideAnswers: boolean;    // Hide solution/answers for classroom pause & think
  revealSolutions: boolean;
  fullscreen: boolean;
}
