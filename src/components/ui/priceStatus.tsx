// The message to show while prices load or when they failed, null once they are ready
export const renderPriceStatus = (loading: boolean, error: string | null) => {
  if (loading) return <p>Henter elpriser…</p>;
  if (error) return <p role="alert">{error}</p>;
  return null;
};
