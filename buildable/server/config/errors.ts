export const ErrorKeys = {
  0: TextToASCII("CREATEUSER(__EXECUTE()): FAILED"),
};

/**
 * Converts a given string to ASCII code.
 * @param text - The string to convert to ASCII code.
 * @returns The ASCII code of the given string.
 */
function TextToASCII(text: string) {
  let ascii = "";
  for (let i = 0; i < text.length; i++) {
    if (i > 0) ascii += " ";
    ascii += text.charCodeAt(i).toString();
  }
  return ascii;
}
