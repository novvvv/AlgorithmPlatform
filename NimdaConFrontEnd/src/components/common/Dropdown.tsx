import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface DropdownItem {
  name: string;
  href: string;
}

interface DropdownProps {
  items: DropdownItem[];
}

const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <DropdownContainer>
      <DropdownMenu
        className="py-1"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="options-menu"
      >
        {items.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={DropdownLink}
            role="menuitem"
          >
            {item.name}
          </Link>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;

const DropdownContainer = styled.div`
  position: absolute;
  margin-top: 0.5rem;
  width: 9rem;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: #ffffff;
  border: 1px solid #d1d5db;
`;

const DropdownMenu = styled.div`
  padding: 0.25rem 0;
`;

const DropdownLink = styled(Link)`
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  
  &:hover {
    background-color: #f3f4f6;
    font-weight: 600;
  }
`;