import axios from "axios";
import { Address } from "@/types/address";

const API_BASE = "https://your-api.com/api/addresses"; // Replace with your backend URL

export const getAddresses = async (): Promise<Address[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const addAddress = async (address: Omit<Address, "id">): Promise<Address> => {
  const res = await axios.post(API_BASE, address);
  return res.data;
};

export const updateAddress = async (address: Address): Promise<Address> => {
  const res = await axios.put(`${API_BASE}/${address.id}`, address);
  return res.data;
};

export const deleteAddress = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/${id}`);
};
