import { order, orders } from './data';
import { deepCopy } from '../../utils/deep-copy';
import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { tokenConfig } from "@/config";
import { get, put, del, post } from "../../utils/caller";
class OrdersApi {
  async getOrders(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    const endpoint = "/order";
    let data = (await get(endpoint, {})).data;
    let count = data.length;

    if (count === 0) {
      data = orders;
      count = orders.length;
    }

    if (typeof filters !== "undefined") {
      data = data.filter((order) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          // Checks only the order number, but can be extended to support other fields, such as customer
          // name, email, etc.
          const containsQuery = (order.number || "")
            .toLowerCase()
            .includes(filters.query.toLowerCase());

          if (!containsQuery) {
            return false;
          }
        }

        if (typeof filters.status !== "undefined") {
          const statusMatched = order.status === filters.status;

          if (!statusMatched) {
            return false;
          }
        }

        return true;
      });
      count = data.length;
    }

    if (typeof sortBy !== "undefined" && typeof sortDir !== "undefined") {
      data = applySort(data, sortBy, sortDir);
    }

    if (typeof page !== "undefined" && typeof rowsPerPage !== "undefined") {
      data = applyPagination(data, page, rowsPerPage);
    }

    return Promise.resolve({
      data,
      count,
    });
  }

  getOrder(request = {}) {
    return Promise.resolve(deepCopy(order));
  }

  async updateStatus(orderId, request) {
    const endpoint = `/transaction/${orderId}/status`;
    const token = "Bearer " + tokenConfig.token;
    const data = (await put(endpoint, request, { Authorization: token })).data;
    if (typeof data === "undefined") {
      return Promise.reject(new Error("Failed to update the order status"));
    }

    return data;
  }
}

export const ordersApi = new OrdersApi();
