const leads = [
  "k",
  "kk",
  "n",
  "t",
  "tt",
  "r",
  "m",
  "p",
  "pp",
  "s",
  "ss",
  "-",
  "c",
  "cc",
  "ch",
  "kh",
  "th",
  "ph",
  "h"
];

const vowels = [
  "a",
  "ay",
  "ya",
  "yai",
  "e",
  "ei",
  "ye",
  "yei",
  "o",
  "oa",
  "oai",
  "oi",
  "yo",
  "u",
  "ue",
  "uei",
  "ui",
  "yu",
  "ë",
  "ëi",
  "i"
];

const tails = [
  "-",
  "k",
  "kk",
  "ks",
  "n",
  "nc",
  "nh",
  "t",
  "l",
  "lk",
  "lm",
  "lp",
  "ls",
  "lt",
  "lp",
  "lh",
  "m",
  "p",
  "ps",
  "s",
  "ss",
  "ng",
  "c",
  "ch",
  "kh",
  "th",
  "ph",
  "h"
];

const toRomaja = character => {
  const codePoint = character.codePointAt(0) - 44032;
  if (codePoint < 0 || codePoint > 11129) {
    return character;
  }

  const tailCode = codePoint % 28;
  const vowelCode = ((codePoint - tailCode) % 588) / 28;
  const leadCode = Math.floor(codePoint / 588);

  return leads[leadCode] + vowels[vowelCode] + tails[tailCode];
};

const transliterate = input => {
  return input
    .split("")
    .map(toRomaja)
    .join("")
    .replace(/-+/g, "-")
    .replace(/([aeiouë])-([^aeiouë])/g, "$1$2");
};

document.getElementById("button-transliterate").onclick = () => {
  const input = document.getElementById("input").value;
  const output = transliterate(input);

  document.getElementById("output").value = output;
};
