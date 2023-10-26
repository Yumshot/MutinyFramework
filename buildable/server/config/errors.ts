export const ErrorKeys = {
  0: TextToASCII("CREATEUSER(__EXECUTE()): FAILED"),
<<<<<<< HEAD
  1: TextToASCII("UPDATEUSER(): FAILED"),
  2: TextToASCII("SETNEWCHARACTERDATA(): FAILED"),
=======
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
};

/**
 * Converts a given string to ASCII code.
 * @param text - The string to convert to ASCII code.
 * @returns The ASCII code of the given string.
<<<<<<< HEAD
 * LINK - https://codebeautify.org/ascii-to-text
=======
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
 */
function TextToASCII(text: string) {
  let ascii = "";
  for (let i = 0; i < text.length; i++) {
    if (i > 0) ascii += " ";
    ascii += text.charCodeAt(i).toString();
  }
  return ascii;
}
