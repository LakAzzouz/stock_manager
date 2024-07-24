export type UserCreatedProperties = {
  id: string;
  email: string;
  username: string;
};

export class UserCreated {
  props: UserCreatedProperties;

  constructor(userEventProperties: UserCreatedProperties) {
    this.props = userEventProperties;
  }
}
