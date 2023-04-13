import fs from "fs";
import { client } from "../index.js";
import { definitionOf } from "./dictionarySearch.js";

export const pickNewWord = (msg) => {
  fs.readFile("savedata.json", "utf8", (err, data) => {
    const wartChannel = client.channels.cache.get(process.env.WARTCHANNELID);

    //read the new data and select a random one
    const obj = JSON.parse(data);
    let newObj = obj;
    if (!obj.suggestions.length) {
      wartChannel.send("Error: No words are left in the suggestion list!");
      return;
    }
    const r = Math.floor(Math.random() * obj.suggestions.length);
    const newWord = obj.suggestions[r].word;
    const newWordSuggester = obj.suggestions[r].suggester;

    //save the old word in the history
    newObj.history.push({
      word: obj.currentword,
      suggester: obj.currentwordsuggester,
    });

    // remove the word from the new obj, set current word and suggester
    newObj.suggestions = obj.suggestions.filter((suggestion) => {
      return suggestion.word.toLowerCase() != newWord.toLowerCase();
    });
    newObj.currentword = newWord;
    newObj.currentwordsuggester = newWordSuggester;

    //write the new object and set it as the
    const json = JSON.stringify(newObj); //convert it back to json
    fs.writeFile("savedata.json", json, "utf8", () => {
      //if called from a command, reply to that command...
      if (msg) {
        msg.reply(`The new WArt word for the week is **${newObj.currentword}**! (*call the "define" command if you need a definition*)`);
        console.log(
          `Generated new word via manual command: ${newObj.currentword}`
        );
      }
      //...otherwise, send this in the wart channel
      else {
        wartChannel.send(
          `The WArt word for the week is **${newObj.currentword}**! (*call the "define" command if you need a definition*)`
        );
        console.log(
          `Generated new word via weekly scheduled event: ${newObj.currentword}`
        );
      }
    });
  });
};
