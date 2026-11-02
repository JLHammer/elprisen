import { useId, type ReactNode } from "react";
import styled from "styled-components";

import { useIsTabletUp } from "../../hooks/useBreakpoints";
import { SettingsButton } from "../partials/SettingsButton";

const SITE_NAME = "Elprisen";

export type MainContentWrapperProps = {
  /*
    Left out on the desktop dashboard, so its three sections don't each add a <title>
    and the tab keeps index.html's plain site name
  */
  title?: string;
  heading: string;
  headingSpacing?: string;
  headingExtra?: ReactNode;
  children?: ReactNode;
};

const WrapperStyled = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 4rem;
`;

const HeadingRow = styled.div<{ $spacing: string }>`
  position: relative;
  z-index: 1;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: ${({ $spacing }) => $spacing};
`;

const HeadingExtra = styled.div`
  grid-column: 3;
  justify-self: start;
  display: flex;
  margin-left: 0.5rem;
`;

const Heading = styled.h1`
  grid-column: 2;
  text-align: center;
  text-transform: uppercase;
`;

const SettingsCorner = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.25rem;
`;

export const MainContentWrapper = ({
  title,
  heading,
  headingSpacing = "1rem",
  headingExtra,
  children,
}: MainContentWrapperProps) => {
  const headingId = useId();
  // Tablet and up have the settings button in the header instead
  const isTabletUp = useIsTabletUp();

  return (
    <>
      {title && <title>{`${SITE_NAME} | ${title}`}</title>}

      <WrapperStyled aria-labelledby={headingId}>
        {!isTabletUp && (
          <SettingsCorner>
            <SettingsButton />
          </SettingsCorner>
        )}
        <HeadingRow $spacing={headingSpacing}>
          <Heading id={headingId}>{heading}</Heading>
          {headingExtra && <HeadingExtra>{headingExtra}</HeadingExtra>}
        </HeadingRow>
        {children}
      </WrapperStyled>
    </>
  );
};
