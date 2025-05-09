export interface TranslationTypes {
  app: {
    name: string;
    title: string;
    description: string;
    play: string;
    playAgain: string;
    loading: string;
    changeLevel: string;
  };
  sudoku: {
    levels: {
      easy: string;
      medium: string;
      hard: string;
      expert: string;
      evil: string;
    };
    mistakes: string;
    status: {
      win: {
        title: string;
        description: string;
      };
      lost: {
        title: string;
        description: string;
      };
    };
  };
}
