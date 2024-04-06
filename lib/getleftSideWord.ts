export function getLeftSide(sentence: string): string {
  const index = sentence.indexOf('?');
  if (index !== -1) {
      return sentence.substring(0, index);
  } else {
      return sentence;
  }
}