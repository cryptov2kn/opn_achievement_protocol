export interface IssuerFormData {
  name: string;
  organizationType: string;
  category: string;
  website: string;
  twitter: string;
  description: string;
  country: string;
  foundedYear: string;
  logo: string;
}

export const issuerFormDefault: IssuerFormData = {
  name: "",
  organizationType: "",
  category: "Technology",
  website: "",
  twitter: "",
  description: "",
  country: "",
  foundedYear: "",
  logo: "",
};
