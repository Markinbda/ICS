(function () {
  var form = document.getElementById("material-order-form");
  if (!form) {
    return;
  }

  var cart = [];
  var materialInput = document.getElementById("item-material");
  var tonsInput = document.getElementById("item-tons");
  var truckInput = document.getElementById("item-truck");
  var itemNotesInput = document.getElementById("item-notes");
  var addButton = document.getElementById("add-to-cart");
  var clearCartButton = document.getElementById("clear-cart");
  var cartList = document.getElementById("cart-list");
  var cartEmpty = document.getElementById("cart-empty");
  var cartSummary = document.getElementById("cart-summary");
  var status = document.getElementById("form-status");

  function escapeText(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function cartToPlainText() {
    if (!cart.length) {
      return "No items";
    }

    return cart
      .map(function (item, index) {
        var line = (index + 1) + ". " + item.material + " - " + item.tons + " tons - " + item.truck;
        if (item.notes) {
          line += " - Notes: " + item.notes;
        }
        return line;
      })
      .join("\n");
  }

  function renderCart() {
    cartList.innerHTML = "";

    if (!cart.length) {
      cartEmpty.style.display = "block";
      cartSummary.value = "";
      return;
    }

    cartEmpty.style.display = "none";
    cartSummary.value = cartToPlainText();

    cart.forEach(function (item, index) {
      var li = document.createElement("li");
      li.className = "cart-item";

      var itemCopy = document.createElement("div");
      itemCopy.className = "cart-item-copy";
      itemCopy.innerHTML =
        "<strong>" + escapeText(item.material) + "</strong>" +
        "<p>" + escapeText(String(item.tons)) + " tons | " + escapeText(item.truck) + (item.notes ? " | Notes: " + escapeText(item.notes) : "") + "</p>";

      var removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "cart-remove";
      removeBtn.textContent = "Remove";
      removeBtn.addEventListener("click", function () {
        cart.splice(index, 1);
        renderCart();
      });

      li.appendChild(itemCopy);
      li.appendChild(removeBtn);
      cartList.appendChild(li);
    });
  }

  addButton.addEventListener("click", function () {
    var material = materialInput.value.trim();
    var tons = tonsInput.value.trim();
    var truck = truckInput.value.trim();
    var notes = itemNotesInput.value.trim();

    if (!material || !tons || !truck) {
      status.textContent = "Select material, tonnage, and truck size before adding to cart.";
      return;
    }

    cart.push({
      material: material,
      tons: tons,
      truck: truck,
      notes: notes
    });

    materialInput.value = "";
    tonsInput.value = "";
    truckInput.value = "";
    itemNotesInput.value = "";
    status.textContent = "Item added to cart.";
    renderCart();
  });

  clearCartButton.addEventListener("click", function () {
    cart = [];
    status.textContent = "Cart cleared.";
    renderCart();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!cart.length) {
      status.textContent = "Add at least one material item to the cart before sending.";
      return;
    }

    if (!form.reportValidity()) {
      status.textContent = "Please complete all required contact and delivery fields.";
      return;
    }

    var name = form.elements["name"].value.trim();
    var telephone = form.elements["telephone"].value.trim();
    var billingEmail = form.elements["billing-email"].value.trim();
    var deliveryAddress = form.elements["delivery-address"].value.trim();
    var deliveryDate = form.elements["delivery-date"].value.trim() || "Flexible";
    var deliveryTime = form.elements["delivery-time"].value.trim() || "Flexible";
    var notes = form.elements["notes"].value.trim() || "None";

    var subject = "Material Order Request - " + (name || "ICS Customer");
    var body = [
      "Material Order Request",
      "",
      "Customer Details",
      "Name: " + name,
      "Telephone: " + telephone,
      "Billing Email: " + billingEmail,
      "",
      "Delivery",
      "Address: " + deliveryAddress,
      "Preferred Date: " + deliveryDate,
      "Preferred Time: " + deliveryTime,
      "",
      "Requested Materials",
      cartToPlainText(),
      "",
      "Additional Notes",
      notes,
      "",
      "--",
      "Submitted from ICS Materials Orders page"
    ].join("\n");

    var mailto = "mailto:info@ics.bm?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    window.location.href = mailto;

    status.textContent = "Opening your email app with a combined cart order draft.";
  });

  renderCart();
})();
