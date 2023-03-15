import getUserAge from './getUserAge';

describe('getUserAge', () => {
  it("should return user's age from its birthday", () => {
    expect(getUserAge('08/04/1989')).toEqual(33);
  });
});
