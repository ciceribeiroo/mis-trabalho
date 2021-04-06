export class HistoryError extends Error {
    constructor(action: string) {
      super(action);
      super.name = 'Erro no histórico';
    }
  }
  