import React, { useState, useEffect, useRef } from "react";
import "./cart-action-modeule.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEarthAsia,
  faCircleQuestion,
  faKeyboard,
  faRadiation,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Login-LogOUT/LogOut/AuthProvider/AuthProvider";

const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Trang Chủ",
    to: "/",
  },
  {
    icon: <FontAwesomeIcon icon={faCircleQuestion} />,
    title: "Hồ Sơ Cá Nhân",
    to: "/Profile",
  },
  {
    icon: <FontAwesomeIcon icon={faKeyboard} />,
    title: "Giỏ Hàng",
    to: "/Cart",
  },
  {
    icon: <FontAwesomeIcon icon={faEarthAsia} />,
    title: "Ngôn Ngữ",
    children: {
      title: "Language",
      data: [
        { type: "language", code: "en", title: "English" },
        { type: "language", code: "vi", title: "Tiếng Việt" },
        { type: "language", code: "hq", title: "Hàn Quốc" },
        { type: "language", code: "nb", title: "Nhật Bản" },
      ],
    },
  },
  {
    icon: <FontAwesomeIcon icon={faRadiation} />,
    title: "Đăng Xuất",
    onClick: null, // Chúng ta sẽ gán hàm ở dưới
  },
];

function Menu() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [showLanguage, setShowLanguage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    MENU_ITEMS[4].onClick = logOut; // Gán hàm đăng xuất cho mục menu
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
        setShowLanguage(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [logOut]);

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleSettingsClick = () => {
    setShowMenu(!showMenu);
    setShowOptions(true);
    setShowLanguage(false);
  };

  const handleLanguageClick = () => {
    setShowOptions(false);
    setShowLanguage(true);
  };

  const handleLanguageSelect = (language) => {
    console.log("Ngôn ngữ đã chọn:", language.title);
    setShowLanguage(false);
    setShowOptions(true);
    setShowMenu(false);
  };

  return (
    <div className="duc1234">
      <button className="menu-item-t" onClick={handleSettingsClick}>
        <img className="avatar" src={user.img} alt="Avatar" />
      </button>
      {showMenu && (
        <div
          className="menu-containert"
          ref={menuRef}
          style={{
            maxWidth: "150px",
            minHeight: "100px",
            maxHeight: "700px",
            background: "#fff",
            boxShadow: "7px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          {showOptions && (
            <div className="options-containert">
              {MENU_ITEMS.map((menuItem, index) => {
                if (menuItem.children) {
                  return (
                    <div
                      key={index}
                      className="menu-itemt"
                      onClick={handleLanguageClick}
                    >
                      {menuItem.icon} {menuItem.title}
                    </div>
                  );
                }
                return (
                  <div
                    key={index}
                    className="menu-itemt"
                    onClick={() => {
                      if (menuItem.onClick) {
                        menuItem.onClick(); // Gọi hàm đăng xuất
                      } else {
                        handleNavigate(menuItem.to);
                      }
                    }}
                  >
                    {menuItem.icon} {menuItem.title}
                  </div>
                );
              })}
            </div>
          )}
          {showLanguage && (
            <div className="options-containert">
              {MENU_ITEMS[3].children.data.map((item) => (
                <div
                  key={item.code}
                  className="menu-itemt"
                  onClick={() => handleLanguageSelect(item)}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="Name" onClick={handleSettingsClick}>
        {user.nameUser}
      </div>
    </div>
  );
}

export default Menu;
