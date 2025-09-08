// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export async function getProducts() {
  const { data } = await api.get("/products");
  return data;
}
