import axios from "axios";

// Uses this API: https://dictionaryapi.dev/
const baseURL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

export const definitionOf = async (word, onSearchComplete, onSearchFail) => {
  axios
    .get(`${baseURL}${word}`)
    .then((response) => {
      onSearchComplete(response);
    })
    .catch((err) => onSearchFail(err));

  //const meaning = data.meanings[0];
  //const definition = meaning.definitions[0].definition;
};
