import { applyPagination } from '../../utils/apply-pagination';
import { applySort } from '../../utils/apply-sort';
import { deepCopy } from '../../utils/deep-copy';
import { customer, customers, emails, invoices, logs } from './data';
import { get } from "../../utils/caller";
class CustomersApi {
  async getCustomers(request = {}) {
    const { filters, page, rowsPerPage, sortBy, sortDir } = request;
    const endpoint = "/user/customer";
    let data = (await get(endpoint)).data;

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
    let data = (await get(endpoint)).data;

    if (typeof data === "undefined") {
      data = deepCopy(customer);
    }

    return data;
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
}

export const customersApi = new CustomersApi();
