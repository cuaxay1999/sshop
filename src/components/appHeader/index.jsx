"use client";

import NavBar from "./components/navBar";
import TopBar from "./components/topBar";
import $ from "jquery";

import "./css/index.scss";

const AppHeader = () => {
  const handleToggleMenuMobile = () => {
    if (window.isMobile) {
      if ($(".nav-bar").hasClass("open-in-mobile")) {
        $(".nav-bar").removeClass("open-in-mobile");
      } else {
        $(".nav-bar").addClass("open-in-mobile");
      }
    }
  };

  return (
    <div className="app-header">
      <TopBar handleToggleMenuMobile={handleToggleMenuMobile} />

      <NavBar handleToggleMenuMobile={handleToggleMenuMobile} />
    </div>
  );
};

export default AppHeader;
