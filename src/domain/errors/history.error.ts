export class HistoryError extends Error {
    constructor(action: string) {
      super(action+". Tente Novamente");
      super.name = 'History Error';
    }
  }
  