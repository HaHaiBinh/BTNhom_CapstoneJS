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

// cart ???????c l??u d?????i d???ng :
// cart = [
//   { product: { id: 1, name: "san pham 1", price: 123 }, quantity: 1 }
// ]

// let addToCart = async (idPhone) => {
//   // ?????c data trong localStorage
//   let storage = localStorage.getItem("cart");
//   // n???u trong localStorage c?? data th?? chuy???n v??? th??nh json
//   if (storage) {
//     cart = JSON.parse(storage);
//   }
//   // l???y s???n ph???m theo id khi m??nh truy???n v??
//   let product = await getProductById(id);
//   // x??t trong cart c?? sp n??o tr??ng id m??nh truy???n sp th?? c???ng th??m 1 v??o quantity
//   let item = cart.find((c) => c.product.id == idPhone);
//   if (item) {
//     // n???u c?? item n??y th?? quantity +1 ti???p
//     item.quantity += 1;
//   } else {
//     // n???u kh??ng c?? th?? push (product c?? quantity = 1) v??o cart
//     cart.push({ product, quantity: 1 });
//   }
//   // l??u v??o localStorage v?? chuy???n l???i th??nh d???ng chu???i
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
