import { subDays, subHours } from "date-fns";

const now = new Date();

export const vouchers = [
  {
    id: "5e887ac47eed253091be10cb",
    name: "Voucher 1",
    code: "KHG-123",
    discount: 10,
    value: 100000,
    quantity: 100,
    startDate: subDays(subHours(now, 7), 1).getTime(),
    endDate: subDays(subHours(now, 7), 1).getTime(),
    discountType: "percent",
    status: "active",
  },
  {
    id: "5e887b209c28ac3dd97f6db5",
    name: "Voucher 2",
    code: "KHG-456",
    discount: 20,
    value: 200000,
    quantity: 200,
    startDate: subDays(subHours(now, 1), 2).getTime(),
    endDate: subDays(subHours(now, 1), 2).getTime(),
    discountType: "percent",
    status: "active",
  },
  {
    id: "5e887b7602bdbc4dbb234b27",
    name: "Voucher 3",
    code: "KHG-789",
    discount: 30,
    value: 300000,
    quantity: 300,
    startDate: subDays(subHours(now, 4), 2).getTime(),
    endDate: subDays(subHours(now, 4), 2).getTime(),
    discountType: "percent",
    status: "active",
  },
  {
    id: "5e887a1fbefd7938eea9c981",
    name: "Voucher 4",
    code: "KHG-101",
    discount: 40,
    value: 400000,
    quantity: 400,
    startDate: subDays(subHours(now, 2), 5).getTime(),
    endDate: subDays(subHours(now, 2), 5).getTime(),
    discountType: "percent",
    status: "active",
  },
];
