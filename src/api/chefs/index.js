import { applyPagination } from "../../utils/apply-pagination";
import { chefs } from "./data";
import { get } from "../../utils/caller";
import { tokenConfig } from "@/config";
class ChefsApi {
  async getChefs(request = {}) {
    const token = "Bearer " + tokenConfig.token;
    const { filters, page, rowsPerPage } = request;
    const endpoint = "/user/chef";
    let data = (await get(endpoint, {}, { Authorization: token })).data;
    let count = data.length;
    if (count === 0) {
      data = chefs;
      count = data.length;
    }

    // let data = chefs;
    // let count = chefs.length;
    if (typeof filters !== "undefined") {
      data = data.filter((chef) => {
        if (typeof filters.name !== "undefined" && filters.name !== "") {
          const nameMatched = chef.name
            .toLowerCase()
            .includes(filters.name.toLowerCase());

          if (!nameMatched) {
            return false;
          }
        }

        // It is possible to select multiple category options
        if (
          typeof filters.category !== "undefined" &&
          filters.category.length > 0
        ) {
          const categoryMatched = filters.category.includes(chef.category);

          if (!categoryMatched) {
            return false;
          }
        }

        // It is possible to select multiple status options
        if (
          typeof filters.status !== "undefined" &&
          filters.status.length > 0
        ) {
          const statusMatched = filters.status.includes(chef.status);

          if (!statusMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof page !== "undefined" && typeof rowsPerPage !== "undefined") {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }
}

export const chefsApi = new ChefsApi();
