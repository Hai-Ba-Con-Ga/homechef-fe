import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { customer, customers, emails, invoices, logs } from './data';
import { get, put, del, post } from "../../utils/caller";
import { tokenConfig } from "@/config";
class CustomersApi {
  async getCustomers(request = {}) {
    const token = "Bearer " + tokenConfig.token;
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    const endpoint = "/user/customer";
    let data = (await get(endpoint, {}, { Authorization: token })).data;

    let count = data.length;
    if (count === 0) {
      data = customers;
      count = customers.length;
    }

    if (typeof filters !== "undefined") {
      data = data.filter((customer) => {
        if (typeof filters.query !== "undefined" && filters.query !== "") {
          let queryMatched = false;
          const properties = ["email", "fullName"];

          properties.forEach((property) => {
            if (
              customer[property]
                .toLowerCase()
                .includes(filters.query.toLowerCase())
            ) {
              queryMatched = true;
            }
          });

          if (!queryMatched) {
            return false;
          }
        }

        if (typeof filters.hasAcceptedMarketing !== "undefined") {
          if (customer.hasAcceptedMarketing !== filters.hasAcceptedMarketing) {
            return false;
          }
        }

        if (typeof filters.isProspect !== "undefined") {
          if (customer.isProspect !== filters.isProspect) {
            return false;
          }
        }

        if (typeof filters.isReturning !== "undefined") {
          if (customer.isReturning !== filters.isReturning) {
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

  async getCustomer(request) {
    const { customerId } = request;
    const endpoint = `/user/${customerId}`;
    const token = "Bearer " + tokenConfig.token;
    let data = (await get(endpoint, {}, { Authorization: token })).data;

    if (typeof data === "undefined") {
      data = deepCopy(customer);
    }

    return data;
  }

  async deleteCustomer(request) {
    const { customerId } = request;
    console.log("customerId", customerId);
    const endpoint = `/user/${customerId}`;
    const token = "Bearer " + tokenConfig.token;
    const data = (await del(endpoint, {}, { Authorization: token })).data;
    return Promise.resolve(data);
  }

  async createCustomer(request) {
    const endpoint = "/user";
    const token = "Bearer " + tokenConfig.token;
    const data = (await post(endpoint, request, { Authorization: token })).data;
    if (typeof data === "undefined") {
      return Promise.reject(new Error("Customer not found"));
    }
    return Promise.resolve(deepCopy(data));
  }

  getEmails(request) {
    return Promise.resolve(deepCopy(emails));
  }

  getInvoices(request) {
    return Promise.resolve(deepCopy(invoices));
  }

  getLogs(request) {
    return Promise.resolve(deepCopy(logs));
  }

  async updateCustomer(customerId, customer) {
    const endpoint = `/user/${customerId}`;
    const token = "Bearer " + tokenConfig.token;
    const data = (await put(endpoint, customer, { Authorization: token })).data;

    if (typeof data === "undefined") {
      return Promise.reject(new Error("Customer not found"));
    }

    return Promise.resolve(deepCopy(customer));
  }
}

export const customersApi = new CustomersApi();
