import React from "react";
import classnames from "classnames/bind";
import styles from "./admin-module.scss";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";

// Import your components
import Sales from "./Sales";
import Bieudo from "./urser";
import Product_manager from "./product2/indexone";
import Order_Manager from "./order/order_manager";
import OrderAccept from "./order/manager/Order_accepted";
import OrderUnAccept from "./order/manager/order_cancellation";
import Bank_voucher from "./Voucher/Bank_voucher";
import Book_voucher from "./Voucher/Bookstore";
import Freeship_voucher from "./Voucher/FresShip";

const cx = classnames.bind(styles);

const tabStyles = {
  width: "250px",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 1.5)",
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAccordionButtonClick = (index) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        minHeight: 224,
        minWidth: 250,
      }}
    >
      <div className={cx("Admin")}>
        <div>
          <p className={cx("Admin_text")}>Admin</p>

          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              className={cx("Admin_sibar")}
              sx={tabStyles}
              label={<p>Tài Khoản</p>}
              {...a11yProps(0)}
            />
            <Tab
              className={cx("Admin_sibar")}
              sx={tabStyles}
              label={<p>Quản Lí Tài Khoản</p>}
              {...a11yProps(2)}
            />

            <Tab
              className={cx("Admin_sibar")}
              sx={tabStyles}
              label={<p>Quản Lí Đơn Hàng</p>}
              {...a11yProps(3)}
            />
          </Tabs>

         
        </div>
      </div>

      <TabPanel className={cx("admin-tab")} value={value} index={0}>
        <Bieudo />
      </TabPanel>

      <TabPanel className={cx("admin-tab")} value={value} index={1}>
        <Product_manager />
      </TabPanel>
      <TabPanel className={cx("admin-tab")} value={value} index={2}>
        <Order_Manager />
      </TabPanel>
      <TabPanel className={cx("admin-tab")} value={value} index={4}>
        <OrderAccept />
      </TabPanel>
      <TabPanel className={cx("admin-tab")} value={value} index={5}>
        <OrderUnAccept />
      </TabPanel>

      <TabPanel className={cx("admin-tab")} value={value} index={7}>
        <Freeship_voucher />
      </TabPanel>
      <TabPanel className={cx("admin-tab")} value={value} index={8}>
        <Book_voucher />
      </TabPanel>
      <TabPanel className={cx("admin-tab")} value={value} index={9}>
        <Bank_voucher />
      </TabPanel>
    </Box>
  );
}

export default VerticalTabs;
