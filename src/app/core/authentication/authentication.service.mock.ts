export class MockAuthenticationService {
  credentials: any | null = {
    id_token: '',
    access_token: '',
    token_type: 'Bearer',
    expires_in: '3600'
  };

  _cognitoUser: any = null;

  isAuthenticated(): boolean {
    return !!this.credentials;
  }
}
