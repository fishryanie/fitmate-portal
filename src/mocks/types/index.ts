type TypeProvince = {
  idProvince: string;
  name: string;
};
type TypeDistrict = {
  idProvince: string;
  idDistrict: string;
  name: string;
};
type TypeWard = {
  idDistrict: string;
  idWard: string;
  name: string;
};
type TypeTermsPolicy = {
  title: string;
  content: string;
};

export { TypeTermsPolicy, TypeProvince, TypeDistrict, TypeWard };
