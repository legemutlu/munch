export const getUniqueFromArray = (data) =>{
  if(typeof data !== "undefined"){
    return [...new Set(data)];
  }
};

export const isNullOrUndefined = (data) => {
  if(typeof data !== "undefined" && data !== "null"){
    return data;
  }
}

