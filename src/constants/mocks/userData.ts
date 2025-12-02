/**
 * Mock data for user information
 */

export interface UserData {
  heartCount: number;
  scoreCount: number;
  fireCount: number;
}

export const userData: UserData = {
  heartCount: 5,
  scoreCount: 6000,
  fireCount: 3,
};

/**
 * Get user data
 * @returns UserData
 */
export const getUserData = (): UserData => {
  return userData;
};

