import axios from 'axios';

async function getOrderData() {
  const base = 'http://localhost:8000/api/v1';
  const orderUrl = `${base}/orders`;
  const getOrders = async () => await axios.get(`${orderUrl}`);
  const {data} = await getOrders();
  return data;
}

const checkOrderBefore = async (item) => {
  let mapOrderArr = [];
  let foodsArr = [];
  await getOrderData().then(data =>
    data.data.map(el => el.foods.filter(food => {
    if(food.food._id === item._id){
      mapOrderArr.push(el.foods);
    }
  })));
  mapOrderArr.map(data => data.map(el => {
    if (el.food._id !== item._id && el.food.category.topCategory !== item.category.topCategory) {
        foodsArr.push(el.food)
    }
  }));
  return foodsArr
}

function getMostFrequentUsed(arr){
  return arr.sort((a,b) =>
    arr.filter(v => v===a).length
    - arr.filter(v => v===b).length
  ).pop();
}

const setSuggestionFood = (item) => {
  return checkOrderBefore(item).then(data => {
    if (data.length > 0) {
      return getMostFrequentUsed(data);
    }
  })
}


export function checkSuggestion(cartItems){
  return setSuggestionFood(cartItems[0])
}