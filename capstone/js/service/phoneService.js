const BASE_URL = "https://62ed1c2a818ab252b60a01ba.mockapi.io/products";

export let phoneService = {
  layDanhSachPhone: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
};
