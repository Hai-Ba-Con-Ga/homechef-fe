import { SvgIcon } from "@mui/material";
import Building04Icon from "../../icons/untitled-ui/duocolor/building-04";
import HomeSmileIcon from "../../icons/untitled-ui/duocolor/home-smile";
import LayoutAlt02Icon from "../../icons/untitled-ui/duocolor/layout-alt-02";
import MessageChatSquareIcon from "../../icons/untitled-ui/duocolor/message-chat-square";
import ReceiptCheckIcon from "../../icons/untitled-ui/duocolor/receipt-check";
import Share07Icon from "../../icons/untitled-ui/duocolor/share-07";
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
        title: t(tokens.nav.productList),
        path: paths.dashboard.products.index,
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingBag03Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.products.index,
          },
          {
            title: t(tokens.nav.create),
            path: paths.dashboard.products.create,
          },
        ],
      },
      {
        title: t(tokens.nav.orderList),
        icon: (
          <SvgIcon fontSize="small">
            <ShoppingCart01Icon />
          </SvgIcon>
        ),
        path: paths.dashboard.orders.index,
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.orders.index,
          },
          {
            title: t(tokens.nav.details),
            path: paths.dashboard.orders.details,
          },
        ],
      },
      {
        title: t(tokens.nav.invoiceList),
        path: paths.dashboard.invoices.index,
        icon: (
          <SvgIcon fontSize="small">
            <ReceiptCheckIcon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.list),
            path: paths.dashboard.invoices.index,
          },
          {
            title: t(tokens.nav.details),
            path: paths.dashboard.invoices.details,
          },
        ],
      },

      {
        title: t(tokens.nav.jobList),
        path: paths.dashboard.jobs.index,
        icon: (
          <SvgIcon fontSize="small">
            <Building04Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.browse),
            path: paths.dashboard.jobs.index,
          },
          {
            title: t(tokens.nav.details),
            path: paths.dashboard.jobs.companies.details,
          },
          {
            title: t(tokens.nav.create),
            path: paths.dashboard.jobs.create,
          },
        ],
      },
      {
        title: t(tokens.nav.socialMedia),
        path: paths.dashboard.social.index,
        icon: (
          <SvgIcon fontSize="small">
            <Share07Icon />
          </SvgIcon>
        ),
        items: [
          {
            title: t(tokens.nav.profile),
            path: paths.dashboard.social.profile,
          },
          {
            title: t(tokens.nav.feed),
            path: paths.dashboard.social.feed,
          },
        ],
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
        path: paths.dashboard.chat,
        icon: (
          <SvgIcon fontSize="small">
            <MessageChatSquareIcon />
          </SvgIcon>
        ),
      },
    ],
  },
];
