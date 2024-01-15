import { SvgIcon } from "@mui/material";
import HomeSmileIcon from "../../icons/untitled-ui/duocolor/home-smile";
import LayoutAlt02Icon from "../../icons/untitled-ui/duocolor/layout-alt-02";
import MessageChatSquareIcon from "../../icons/untitled-ui/duocolor/message-chat-square";
import ReceiptCheckIcon from "../../icons/untitled-ui/duocolor/receipt-check";
import ShoppingBag03Icon from "../../icons/untitled-ui/duocolor/shopping-bag-03";
import ShoppingCart01Icon from "../../icons/untitled-ui/duocolor/shopping-cart-01";
import Users03Icon from "../../icons/untitled-ui/duocolor/users-03";
import { tokens } from "../../locales/tokens";
import { paths } from "../../paths";

export const getSections = (t) => [
  {
    items: [
      {
        title: t(tokens.nav.overview),
        path: paths.index,
        icon: (
          <SvgIcon fontSize="small">
            <HomeSmileIcon />
          </SvgIcon>
        ),
      },
    ],
  },
  {
    items: [
      {
        title: t(tokens.nav.customers),
        path: paths.customers.index,
        icon: (
          <SvgIcon fontSize="small">
            <Users03Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.chef),
        path: paths.chefs.index,
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.orderList),
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingCart01Icon />
          </SvgIcon>
        ),
        path: paths.orders.index,
      },
      {
        title: t(tokens.nav.vouchers),
        path: paths.vouchers.index,
        icon: (
          <SvgIcon fontSize="small">
            <ReceiptCheckIcon />
          </SvgIcon>
        ),
      },
      {
        title: t(tokens.nav.blog),
        path: paths.dashboard.blog.index,
        icon: (
          <SvgIcon fontSize="small">
            <LayoutAlt02Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.postList),
            path: paths.dashboard.blog.index,
          },
          {
            title: t(tokens.nav.postDetails),
            path: paths.dashboard.blog.postDetails,
          },
          {
            title: t(tokens.nav.postCreate),
            path: paths.dashboard.blog.postCreate,
          },
        ],
      },

      {
        title: t(tokens.nav.chat),
        path: paths.chat,
        icon: (
          <SvgIcon fontSize="small">
            <MessageChatSquareIcon />
          </SvgIcon>
        ),
      },
    ],
  },
];
