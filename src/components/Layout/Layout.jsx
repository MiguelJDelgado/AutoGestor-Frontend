import { useState } from "react";
import styled from "styled-components";
import Sidebar from "./Sidebar/sidebar";

const LayoutContainer = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.main`
  margin-left: ${({ isOpen }) => (isOpen ? "220px" : "70px")};
  transition: margin-left 0.3s ease;
  padding: 20px 20px 20px 0; /* remove left padding to avoid white bar next to sidebar */
`;

function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <LayoutContainer>
      <Sidebar isOpen={isOpen} onToggle={() => setIsOpen(v => !v)} />
      <MainContent isOpen={isOpen}>{children}</MainContent>
    </LayoutContainer>
  );
}

export default Layout;
