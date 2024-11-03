import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classnames from "classnames/bind";
import Buttonn from "../../../Cart-buggest/button";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import styles from "./button-siderbar-module.scss";

const cx = classnames.bind(styles);

function Button_Sibar() {
  return (
    <div className={cx("button-group")}>
      <div className={cx("button1")}>
        <a href="/categoryName/Khoa Học">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list")}
          >
            Tiểu Thuyết
          </Buttonn>
        </a>
        <a href="/categoryName/Sử Thi">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list")}
          >
            Sử Thi
          </Buttonn>
        </a>
      </div>
      <div className={cx("button1")}>
        <a href="/categoryName/Thiếu Nhi">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list")}
          >
            Thiếu Nhi
          </Buttonn>
        </a>
        <a href="/categoryName/Kinh Dị">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list")}
          >
            Kinh Dị
          </Buttonn>
        </a>
      </div>
      <div className={cx("button1")}>
        <a href="/categoryName/Khoa Học">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list")}
          >
            Khoa Học
          </Buttonn>
        </a>
        <a href="/categoryName/Tình Yêu">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list")}
          >
            Tình Yêu
          </Buttonn>
        </a>
      </div>
      <div className={cx("button-list")}>
        <a className={cx("xoagachchan")} href="/categoryName/Tâm Lý Tình Cảm">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list2")}
          >
            Tâm Lý Tình Cảm
          </Buttonn>
        </a>
      </div>
      <div className={cx("button-list")}>
        <a className={cx("xoagachchan")} href="/categoryName/Tiểu Thuyết Tự Sự">
          <Buttonn
            component="div"
            outline
            more-more
            className={cx("button-list2")}
          >
            Tiểu Thuyết Tự Sự
          </Buttonn>
        </a>
      </div>
    </div>
  );
}

export default Button_Sibar;
