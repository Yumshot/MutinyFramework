import { ADAPTIVE_CARD_QUOTES } from "join/constants/quotes";

export const funnyCommit = () => {
  const message =
    ADAPTIVE_CARD_QUOTES[
      Math.floor(Math.random() * ADAPTIVE_CARD_QUOTES.length)
    ];
  return message;
};
