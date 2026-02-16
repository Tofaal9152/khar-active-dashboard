const NormalizedPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber.startsWith("+88")) {
    const digitsOnly = phoneNumber.replace(/\D/g, "");
    return `+88${digitsOnly}`;
  }

  return phoneNumber;
};

export default NormalizedPhoneNumber;

