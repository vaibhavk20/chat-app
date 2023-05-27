import React, { useEffect } from "react";
import axios from "axios";

export default function Chats() {

  const fetchData = async () => {
    const { data } = await axios.get("http://localhost:8080/api/chats");
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return <div>Chats</div>;
}
