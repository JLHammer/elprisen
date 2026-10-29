import { MainContentWrapper } from "../components/layout/MainContentWrapper";
import { PAGE_LABELS } from "../router/routes";

const { notFound } = PAGE_LABELS;

export const NotFoundPage = () => {
  return <MainContentWrapper title={notFound} heading={notFound} />;
};
