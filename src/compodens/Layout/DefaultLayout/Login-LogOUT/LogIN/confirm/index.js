import classnames from "classnames/bind";
import styles from "./confirm-module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Buttonn from "../../../../Cart-buggest/button";
import Grid from "@mui/material/Grid";
import Swal from "sweetalert2";

const cx = classnames.bind(styles);

function Confirm() {
  const [nameUser, setNameUser] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [phoneError, setPhoneError] = useState(true);
  const [emailerror, setemainerror] = useState(true);

  const handleRegister = () => {
    if (password && password === confirmPassword) {
      addUser();
    } else {
      setInputError(true);
      Swal.fire("Mật khẩu không khớp");
    }
  };

  function validatePhoneNumber(input_str) {
    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return re.test(input_str);
  }

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const addUser = () => {
    if (!validateEmail(userName)) {
      setemainerror(false);
      return;
    }
    if (!validatePhoneNumber(phone)) {
      setPhoneError(false);
      return;
    }
    setemainerror(true);
    setPhoneError(true);
    if (nameUser && userName && phone && address && email && password) {
      fetch("http://localhost:8080/bookstore_api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          name: nameUser,
          email,
          username: userName,
          phone,
          address,
          password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "User created successfully") {
            clearForm();
            Swal.fire({
              title: "Đăng Ký Thành Công!",
              icon: "success",
            }).then((result) => {
              if (result.isConfirmed || result.isDismissed) {
                window.location.href = "/LOGIN"; // Redirect to login page
              }
            });
          } else {
            Swal.fire({
              title: "Gmail đã có người đăng ký",
              icon: "error",
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          Swal.fire({
            icon: "error",
            title: "Lỗi...",
            text: "Đăng Ký Lỗi",
          });
        });
    } else {
      alert("Vui lòng điền đầy đủ thông tin");
    }
  };

  const clearForm = () => {
    setNameUser("");
    setUserName("");
    setPhone("");
    setAddress("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleUserNameChange = (e) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    setEmail(newUserName ? `${newUserName}@domain.com` : ""); // Tạo email tự động
  };

  const handlePhoneChange = (e) => {
    const phoneValue = e.target.value;
    setPhone(phoneValue);
    setPhoneError(validatePhoneNumber(phoneValue)); // Cập nhật trạng thái lỗi
  };

  return (
    <div className={cx("Content_LogIn_confirm-sinput")}>
      <Grid container>
        <Grid className="input-contssssainer" item xs={12} md={12}>
          <p className={cx("Content_LogIN")}>Đăng Ký</p>
          <div className={cx("Content_LogOUT-mk ContenSt_LogOUT-Smk")}>
            <div className={cx("Content_Logsss")}>
              <div className="input-container lkdjunn">
                <input
                  type="text"
                  placeholder="Nhập UserName"
                  value={userName}
                  onChange={handleUserNameChange}
                  className={cx(phoneError ? "" : "error")}
                />
                {!emailerror && (
                  <p
                    className={cx("error-message")}
                    style={{
                      position: "absolute",
                      top: "29%",
                      left: "34px",
                      color: "red",
                      fontSize: "0.875rem",
                    }}
                  >
                    Email không hợp lệ
                  </p>
                )}
                <input
                  type="text"
                  placeholder="Nhập Họ Tên"
                  value={nameUser}
                  onChange={(e) => setNameUser(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Nhập Địa Chỉ"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div
                className={cx("input-container lkdjunn")}
                style={{ position: "relative" }}
              >
                <input
                  type="text"
                  placeholder="Số Điện Thoại"
                  value={phone}
                  onChange={handlePhoneChange}
                  className={cx(phoneError ? "" : "error")}
                />
                {!phoneError && (
                  <p
                    className={cx("error-message")}
                    style={{
                      position: "absolute",
                      top: "29%",
                      left: "34px",
                      color: "red",
                      fontSize: "0.875rem",
                    }}
                  >
                    Số điện thoại không hợp lệ
                  </p>
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Tạo Mật Khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={
                    inputError && (!password || password !== confirmPassword)
                      ? "error"
                      : ""
                  }
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập Lại Mật Khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={
                    inputError &&
                    (!confirmPassword || password !== confirmPassword)
                      ? "error"
                      : ""
                  }
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
            </div>
            <Buttonn
              className={cx("Content_LogOUT-mk-button")}
              onClick={handleRegister}
              disabled={
                !password ||
                !confirmPassword ||
                password !== confirmPassword ||
                !nameUser ||
                !userName ||
                !phone ||
                !address ||
                !email
              }
              primary1
              more
            >
              Đăng Ký
            </Buttonn>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default Confirm;
