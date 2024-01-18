const showPreview = (paragraph, numberOfWords = 15) => {
  // Split the paragraph into an array of words using whitespace as the separator
  const wordsArray = paragraph.split(/\s+/);
  return numberOfWords < wordsArray.length
    ? wordsArray.slice(0, numberOfWords).join(' ') + '...'
    : wordsArray.slice(0, numberOfWords).join(' ');
    
}

const extractText = (obj, maxNumChar = 200) => {
  let text = '';

  if (typeof obj === 'object') {
    if (obj.text) {
      text += obj.text;
    } 
  
    for (const key in obj) {
      text += extractText(obj[key]);
    }
  }
  return text;
};





const getShortDescription = (data, numberOfWords = 15) => showPreview(extractText(data), numberOfWords = 15);


export default getShortDescription;