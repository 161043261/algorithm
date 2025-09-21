const xhr = new XMLHttpRequest();
xhr.open("GET", "https://ys.mihoyo.com/main/character/liyue?char=11", true);
xhr.withCredentials = true;
xhr.setRequestHeader("Content-Type", "application/json");
xhr.onload = function () {
  if (xhr.status === 200) {
    console.log(xhr.responseText);
  }
};
xhr.send();
