import { subDays, subHours } from 'date-fns';

const now = new Date();

export const notifications = [
  {
    id: "5e8883f1b51cc1956a5a1ec0",
    author: "Cat Nguyen",
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subHours(now, 2).getTime(),
    job: "",
    read: true,
    type: "new_order",
  },
  {
    id: "bfb21a370c017acc416757c7",
    author: "Cat Nguyen",
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    createdAt: subHours(now, 2).getTime(),
    job: "",
    read: false,
    type: "new_order",
  },
  {
    id: "20d9df4f23fff19668d7031c",
    createdAt: subDays(now, 1).getTime(),
    description: "Order management is now available",
    read: true,
    type: "new_feature",
  },
  {
    id: "5e8883fca0e8612044248ecf",
    author: "Cat Nguyen",
    avatar: "/assets/avatars/avatar-jie-yan-song.png",
    company: "VCH_123",
    createdAt: subHours(now, 2).getTime(),
    read: false,
    type: "new_voucher",
  },
];
