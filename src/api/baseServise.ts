import axios from "axios";
import { baseURL } from "./constants";

export const baseServise = axios.create({
    baseURL
})