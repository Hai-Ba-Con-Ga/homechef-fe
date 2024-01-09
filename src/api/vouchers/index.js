class VouchersApi {
  async getVouchers(request = {}) {
    const { filters, sortBy, sortDir, page, rowsPerPage } = request;
    const endpoint = `/vouchers`;
    let data = (await get(endpoint)).data;

    let count = data.length;
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
  async getVoucher(request) {
    const { id } = request;
    const endpoint = `/vouchers/${id}`;
    let data = (await get(endpoint)).data;

    return data;
  }
}
export const vouchersApi = new VouchersApi();
