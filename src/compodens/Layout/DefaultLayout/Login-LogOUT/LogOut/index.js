import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Buttonn from "../../../Cart-buggest/button"; // Giả sử đây là component tùy chỉnh của bạn
import classnames from "classnames/bind";
import styles from "./LouOut-module.scss";
import Swal from "sweetalert2";
import { useAuth } from "./AuthProvider/AuthProvider"; // Giả sử bạn đã tạo context

const cx = classnames.bind(styles);

function Login() {
  const { loginAction } = useAuth(); // Sử dụng action đăng nhập từ context
  const [phoneOrEmail, setPhoneOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setInputError(!phoneOrEmail || !password);

    if (!phoneOrEmail || !password) {
      return;
    }

    try {
      const userData = await loginAction({ username: phoneOrEmail, password });

      // Điều hướng đến trang admin hoặc trang chính
      if (userData.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Đăng nhập thất bại:", error);
      setLoginError(true);
    }
  };

  return (
    <div className={cx("Content_LogOUT-input")}>
      <p className={cx("Content_LogIN")}>Đăng Nhập</p>
      <div className={cx("Content_LogOUT-mk")}>
        <div className="input-container">
          <input
            type="text"
            placeholder="Số điện thoại hoặc email"
            value={phoneOrEmail}
            onChange={(e) => setPhoneOrEmail(e.target.value)}
            className={inputError && !phoneOrEmail ? "error" : ""}
          />
          {inputError && !phoneOrEmail && (
            <span className="error-message">
              Hãy nhập số điện thoại hoặc email
            </span>
          )}
        </div>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputError && !password ? "error" : ""}
          />
          {inputError && !password && (
            <span className="error-message">Hãy nhập mật khẩu</span>
          )}
          {loginError && (
            <span className="error-message">Sai tài khoản hoặc mật khẩu</span>
          )}
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </span>
        </div>
        <Buttonn
          className={cx("Content_LogOUT-mk-button")}
          onClick={handleLogin}
          disabled={!phoneOrEmail || !password}
          primary1
          more
        >
          Đăng Nhập
        </Buttonn>
      </div>
      <div className={cx("Content_LogOUT_QUEN")}>
        <Link className={cx("Content_LogOUT_textz")} to="LogIn">
          <p className={cx("Content_LogOUT_QUENMK")}>Quên Mật Khẩu</p>
        </Link>
        <Link className={cx("Content_LogOUT_textz")} to="/LOGIN/LogIn/Confirm">
          {" "}
          <p className={cx("Content_LogOUT_QUENMK")}>Đăng Ký</p>
        </Link>
      </div>
      <div className={cx("element")}>
        <div className={cx("border-segment")}></div>
        <div className={cx("login-text")}>Hoặc</div>
        <div className={cx("border-segment")}></div>
      </div>
      <div className={cx("Content_LogOUT_BUtton")}>
        <Buttonn className={cx("Content_LogOUT_BUtton1")} primary1>
          <p>Facebook</p>
        </Buttonn>
        <Buttonn className={cx("Content_LogOUT_BUtton1")} primary1>
          <p>Google</p>
        </Buttonn>
      </div>
      <div className={cx("Content_LogOUT_chuabiet")}>
        <p className={cx("Content_LogOUT_text1")}>Bạn đã đến CoJu?</p>
        <p className={cx("Content_LogOUT_text1")}>Đăng Ký</p>
      </div>
    </div>
  );
}

export default Login;
