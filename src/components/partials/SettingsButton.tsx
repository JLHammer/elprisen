import { faCog } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useIsTabletUp } from "../../hooks/useBreakpoints";
import { PAGE_LABELS, ROUTES } from "../../router/routes";
import { SettingsSection } from "../sections/SettingsSection";
import { Icon } from "../ui/Icon";
import { IconButton } from "../ui/IconButton";
import { Modal } from "../ui/Modal";

export const SettingsButton = () => {
  const navigate = useNavigate();
  const isTabletUp = useIsTabletUp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Mobile has settings as its own page, tablet and up open it in a modal
  const handleClick = isTabletUp
    ? () => setIsSettingsOpen(true)
    : () => navigate(ROUTES.settings);

  return (
    <>
      <IconButton
        type="button"
        aria-label="Indstillinger"
        aria-haspopup={isTabletUp ? "dialog" : undefined}
        onClick={handleClick}
      >
        <Icon icon={faCog} size="1.5rem" />
      </IconButton>

      {isTabletUp && (
        <Modal
          open={isSettingsOpen}
          title={PAGE_LABELS.settings}
          onClose={() => setIsSettingsOpen(false)}
        >
          <SettingsSection />
        </Modal>
      )}
    </>
  );
};
