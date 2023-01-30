type _ = undefined;
type Payload = {
  id: string;
  name: string;
  companyId: string;
  country: string;
  dateFoundation: string;
};

export type Arguments = [_, Payload];
