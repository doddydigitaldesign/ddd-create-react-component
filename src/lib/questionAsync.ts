import { rl } from "./rl";

export const questionAsync = async (
  q: string,
  fn: (answer: string) => void
) => {
  return new Promise((resolve, reject) => {
    rl.question(q, (a) => {
      try {
        fn(a);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
};
