import React, { useState, useEffect } from "react";

const Fetchini = () => {
  const { data, setData } = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch("http://localhost:3500/users");
      console.log(response);
      if (response.ok) {
        const data = response.json();
        setData(data);
      } else {
        throw new Error(" Invalide Respons");
      }
    };
    fetchItems();
  });

  return <div></div>;
};

export default Fetchini;
