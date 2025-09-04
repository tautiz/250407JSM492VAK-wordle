export const WORDS = [
  // 100 transliterated Lithuanian 5-letter words (ASCII-safe)
  "zodis","galva","saule","lietu","namas","kelia","diena","vakre","laikas","minty",
  "ranko","siena","upesn","tilta","svoris","sadra","gydas","smals","ranka","jauna",
  "veidas","balsu","namai","zalia","burna","drugy","spaus","kodas","matas","sritis",
  "mete","aklas","greit","ramus","tylus","juoda","balta","skelb","silen","kunas",
  "stalas","klase","mokyk","sveik","mesta","lygae","valgy","geras","bloga","juoky",
  "knyga","zmones","saule","vakar","rytas","svara","karas","taika","sveta","diena",
  "skaic","skaus","rostu","torty","medus","sultn","laime","balsa","kalba","pasae",
  " sloga","salta","silta","lente","varza","zalia","ruduo","vasar","pavas","ziema",
  "kranas","vejas","lietus","sodas","gyvul","augti","sokti","bega","stoti","vezys",
  "laura","zelda","rugse","juoda","sirka","sedek","taska","spindi","moksl","keitv"
]

export function isValidWord(w) {
  return WORDS.includes(w.toLowerCase())
}

export function pickRandom() {
  return WORDS[Math.floor(Math.random() * WORDS.length)]
}

export default { WORDS, isValidWord, pickRandom }
