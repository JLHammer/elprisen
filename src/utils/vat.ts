const VAT_RATE = 0.25;

export const addVat = (price: number) => price * (1 + VAT_RATE);
