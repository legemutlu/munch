import axios from 'axios';

function wordCountMap(str) {
  let words = str.split(" ");
  let wordCount = {};
  words.forEach((w) => {
    wordCount[w] = (wordCount[w] || 0) + 1;
  });
  return wordCount;
}
function addWordsToDictionary(wordCountmap, dict) {
  for (let key in wordCountmap) {
    dict[key] = true;
  }
}
function wordMapToVector(map, dict) {
  let wordCountVector = [];
  for (let term in dict) {
    wordCountVector.push(map[term] || 0);
  }
  return wordCountVector;
}
function dotProduct(vecA, vecB) {
  let product = 0;
  for (let i = 0; i < vecA.length; i++) {
    product += vecA[i] * vecB[i];
  }
  return product;
}

function similarity(vecA, vecB, txtA) {
  return dotProduct(vecA, vecB) / Object.keys(wordCountMap(txtA)).length;
}

function textCosineSimilarity(txtA, txtB) {
  const wordCountA = wordCountMap(txtA);
  const wordCountB = wordCountMap(txtB);
  let dict = {};
  addWordsToDictionary(wordCountA, dict);
  addWordsToDictionary(wordCountB, dict);
  const vectorA = wordMapToVector(wordCountA, dict);
  const vectorB = wordMapToVector(wordCountB, dict);
  return similarity(vectorA, vectorB, txtA);
}

function getSimilarityScore(val) {
  return Math.round(val * 100);
}


async function getData(){
  const base = 'http://localhost:8000/api/v1';
  const foodUrl = `${base}/foods`;
  const getSearched = async () => await axios.get(`${foodUrl}/getSearch`);
  const {data} = await getSearched();
  return data
}


export async function checkSimilarity(text) {
  const sumArr = [];
  let descriptionAndId = [];
  await getData().then(r => descriptionAndId = r );
  descriptionAndId.filter((el) => {
      let getScore = textCosineSimilarity(text, el.description);
      if (getSimilarityScore(getScore) >= 40) {
        sumArr.push(el._id);
      }
  });

  return sumArr;
}

