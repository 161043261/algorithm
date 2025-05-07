const originalXhrProto = XMLHttpRequest.prototype;
const originalOpen = originalXhrProto.open;

const xhr = new XMLHttpRequest();

originalXhrProto.open = function (...args) {
  console.log("open args", args);
  console.log("open arguments", arguments);
  console.log("open", this, this === xhr);
  originalOpen.call(this, ...args);
};

const originalSend = originalXhrProto.send;
originalXhrProto.send = function (...args) {
  console.log("send args", args);
  console.log("send arguments", arguments);
  console.log("send", this, this === xhr);
  originalSend.apply(this, args);
};

xhr.onload = function () {
  console.log("onload", this, this === xhr);
  if (xhr.status >= 200 && xhr.status < 300) {
    console.log("xhr.responseText", xhr.responseText);
  } else {
    console.error("xhr.status", xhr.status);
  }
};

xhr.onerror = function (...args) {
  console.log("onerror args", args);
  console.log("onerror arguments", arguments);
  console.log("onerror", this, this === xhr);
  console.error("xhr.onerror", args);
};

xhr.open(
  "GET",
  "https://ys.mihoyo.com/main/character/mondstadt?char=0",
  false /** async */,
);
xhr.send();
