import { Phone } from "../model/phoneModel.js";
import { phoneService } from "./service/phoneService.js";

let dataPhone = [];

let renderPhone = (list) => {
  let contentHTML = "";
  for (let i = 0; i < list.length; i++) {
    let phone = list[i];
    let contentItem = ` <div class="phoneItem">
                            <img src="${phone.img}" alt="${phone.name}" />                           
                            <p>Name: ${phone.name}</p>
                            <p class="price">
                              Price: ${phone.price}
                              <button onclick="addToCart(${phone.id})">Add</button>
                            </p> 
                            <p>Screen: ${phone.screen}</p>
                            <p>BlackCamera: ${phone.backCamera}</p>
                            <p>FrontCamera: ${phone.frontCamera}</p>
                            <p>Description: ${phone.desc}</p>
                            <p>Type: ${phone.type}</p>
                        </div>`;
    contentHTML += contentItem;
  }
  document.getElementById("content").innerHTML = contentHTML;
};

let renderService = () => {
  phoneService
    .layDanhSachPhone()
    .then((res) => {
      dataPhone = res.data.map((phone) => {
        return new Phone(
          phone.id,
          phone.name,
          phone.price,
          phone.screen,
          phone.backCamera,
          phone.frontCamera,
          phone.img,
          phone.desc,
          phone.type
        );
      });
      renderPhone(dataPhone);
    })
    .catch((err) => {
      console.log(err);
    });
};
renderService();

let onChange = (obj) => {
  phoneService
    .layDanhSachPhone()
    .then((res) => {
      let value = obj.value;
      if (value === "iphone") {
        let result = res.data
          .filter((element) => element.type === "Iphone")
          .map((phone) => {
            return new Phone(
              phone.id,
              phone.name,
              phone.price,
              phone.screen,
              phone.backCamera,
              phone.frontCamera,
              phone.img,
              phone.desc,
              phone.type
            );
          });
        console.log(result);
        renderPhone(result);
      } else if (value === "samsung") {
        let result = res.data
          .filter((element) => element.type === "Samsung")
          .map((phone) => {
            return new Phone(
              phone.id,
              phone.name,
              phone.price,
              phone.screen,
              phone.backCamera,
              phone.frontCamera,
              phone.img,
              phone.desc,
              phone.type
            );
          });
        console.log(result);
        renderPhone(result);
      } else if (value === "all") {
        let result = res.data.map((phone) => {
          return new Phone(
            phone.id,
            phone.name,
            phone.price,
            phone.screen,
            phone.backCamera,
            phone.frontCamera,
            phone.img,
            phone.desc,
            phone.type
          );
        });
        console.log(result);
        renderPhone(result);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
window.onChange = onChange;

let cart = [];

// cart được lưu dưới dạng :
// cart = [
//   { product: { id: 1, name: "san pham 1", price: 123 }, quantity: 1 }
// ]

// let addToCart = async (idPhone) => {
//   // đọc data trong localStorage
//   let storage = localStorage.getItem("cart");
//   // nếu trong localStorage có data thì chuyển về thành json
//   if (storage) {
//     cart = JSON.parse(storage);
//   }
//   // lấy sản phẩm theo id khi mình truyền vô
//   let product = await getProductById(id);
//   // xét trong cart có sp nào trùng id mình truyền sp thì cộng thêm 1 vào quantity
//   let item = cart.find((c) => c.product.id == idPhone);
//   if (item) {
//     // nếu có item này thì quantity +1 tiếp
//     item.quantity += 1;
//   } else {
//     // nếu không có thì push (product có quantity = 1) vào cart
//     cart.push({ product, quantity: 1 });
//   }
//   // lưu vào localStorage và chuyển lại thành dạng chuỗi
//   localStorage.setItem("cart", JSON.stringify(cart));
//   showCart(cart);
// };
// window.addToCart = addToCart;

let addToCart = (idPhone) => {
  let index = cart.findIndex((item) => {
    console.log(item);
    return item.id == idPhone;
  });
  if (index == -1) {
    let newPhone = { ...dataPhone[idPhone], quantity: 1 };
    cart.push(newPhone);
  } else {
    cartPhone[index].quantity++;
  }
  showCart(cart);
};
window.addToCart = addToCart;
let showCart = (shoppingCart) => {
  let cartBody = document.getElementById("tbody_cart");
  cartBody.innerHTML = "";
  shoppingCart.map((item) => {
    cartBody.innerHTML += `<tr>
                              <td>${item.id}</td>
                              <td>${item.name}</td>
                              <td>${item.price}</td>
                              <td>
                                <button onclick="removeItem(${item.id})">Remove<button>
                              </td>
                          </tr>`;
  });
};
window.showCart = showCart;
