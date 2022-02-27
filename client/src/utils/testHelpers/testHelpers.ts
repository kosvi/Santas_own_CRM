
// The point of this function is to give a little time for async code to complete
// or components to re-render before running expect()
const waitGivenTime = async (time = 100): Promise<void> => {
  return await new Promise((resolv) => {
    setTimeout(resolv, time);
  });
};

export const testHelpers = {
  waitGivenTime
};