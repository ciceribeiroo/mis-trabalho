export class PermissionDeniedLocationError extends Error {
    constructor() {
      super('Usuário não permitiu o acesso a localização');
      super.name = 'PermissionDeniedLocationError';
    }
  }
  