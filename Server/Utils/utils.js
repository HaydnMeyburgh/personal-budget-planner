// const isValideReq = (req, res, next) => {
//   const {title, budget} = req.body;
//   if(title === String && budget === Number) {
//     return true;
//   } else {
//     return false;
//   }
// }

const findById = (data, id) => {
  const element = data.find(el => el.id === Number(id));
  if (!element) {
    console.log('Could not find element');
  } else {
    return element;
  }
};

const findByIndex = (data, id) => {
  const elementIndex = data.findIndex(el => el.id === id);
  if (elementIndex === -1) console.log('Couldnt not find index of element');
  return elementIndex;
}

const createNewId = (data) => {
  const newestData = data[data.length - 1];
  const newId = newestData.id + 1;
  if (newId === NaN) console.log('Invalid Id');
  return newId;
}

module.exports = {
  findById,
  findByIndex,
  createNewId
}