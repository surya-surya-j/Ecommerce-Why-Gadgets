import React from "react";
import { useParams } from "react-router-dom";

const CategoryProducts = () => {
    const params = useParams()
   
    const{categoryname}=params
    
  return <div>{categoryname}</div>;
};

export default CategoryProducts;
