import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserBar = () => {
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substring(1);
  const [activeItem, setActiveItem] = useState(path);
  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  return (
    <div className="userbar" style={{ backgroundColor: "#f4f9f9" }}>
      <Menu pointing secondary size="large">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to="/"
        />
        <Menu.Item
          name="compose"
          active={activeItem === "compose"}
          onClick={handleItemClick}
          as={Link}
          to="/compose"
        />

        <Menu.Menu position="right">
          <Menu.Item
            name="profile"
            active={activeItem === "profile"}
            onClick={handleItemClick}
            as={Link}
            to="/profile"
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
};

export default UserBar;
