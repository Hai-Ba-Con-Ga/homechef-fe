import { get, put, del, post } from "../../utils/caller";
import { tokenConfig } from "@/config";
class DashboardApi {
  async getTransactions() {
    const token = "Bearer " + tokenConfig.token;

    const endpoint = "/transaction/dashboard";
    let data = (await get(endpoint, {}, { Authorization: token })).data;
    return data;
  }

  async getData(request) {
    const { by } = request;
    const token = "Bearer " + tokenConfig.token;

    const endpoint = "/dashboard?by=" + by;
    let data = (await get(endpoint, {}, { Authorization: token })).data;
    return data;
  }
}
export const dashboardApi = new DashboardApi();
