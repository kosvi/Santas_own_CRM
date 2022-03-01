/*
 *  For now I will not spend time in figuring the best 
 *  solution for hashing passwords with typescript
 * 
 *  This is IN NO WAY I would hash a password in a 
 *  real project, but will be enough in this project for now
 * 
 *  (probably I wouldn't even handle passwords in app itself, 
 *   but would instead make another microservice for it)
 */

export const hashPassword = (pwd: string): string => {
  return `salt${pwd}salt`;
};
