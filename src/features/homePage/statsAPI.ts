import axios from "axios";
import api from '../../app/api';

export async function basicStats(): Promise<any> {
   try {
    const response = await api.get("/data.min.json");
    return response.data;
   } catch (error) {
       console.log(error)
   }
}