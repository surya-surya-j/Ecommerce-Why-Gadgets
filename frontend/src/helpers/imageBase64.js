// const imageBase64 = async (image) => {
//   const reader = await new FileReader();
//   reader.readAsDataURL(image);

//   const data = new Promise((resolve, reject) => {
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

//   return data;
// };

// export default imageBase64;


const imageBase64 = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(image);
  });
};

export default imageBase64;
