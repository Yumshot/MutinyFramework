export const ErrorKeys = {
  0: TextToASCII("CREATEUSER(__EXECUTE()): FAILED"),
<<<<<<< HEAD
<<<<<<< HEAD
  1: TextToASCII("UPDATEUSER(): FAILED"),
  2: TextToASCII("SETNEWCHARACTERDATA(): FAILED"),
<<<<<<< HEAD
=======
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
=======
  1: TextToASCII("UPDATEUSER(): FAILED"),
>>>>>>> aacf07d (feat(errors): add error messages)
=======
>>>>>>> b5e75a5 (refactor(client): move old files to old folder)
};

/**
 * Converts a given string to ASCII code.
 * @param text - The string to convert to ASCII code.
 * @returns The ASCII code of the given string.
<<<<<<< HEAD
<<<<<<< HEAD
 * LINK - https://codebeautify.org/ascii-to-text
=======
>>>>>>> 9b889d0 (Massive update to the server, this is a complete rewrite of the server.)
=======
 * LINK - https://codebeautify.org/ascii-to-text
>>>>>>> aacf07d (feat(errors): add error messages)
 */
function TextToASCII(text: string) {
  let ascii = "";
  for (let i = 0; i < text.length; i++) {
    if (i > 0) ascii += " ";
    ascii += text.charCodeAt(i).toString();
  }
  return ascii;
}
