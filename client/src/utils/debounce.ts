function debounce<T>(value: T, time: number): T {
  setTimeout(() => {
    return value;
  }, time);
}

export default debounce;