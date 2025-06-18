const connection =
  navigator.connection || navigator.mozConnection || navigator.webkitConnection;
console.log("effectiveType:", connection.effectiveType); // 例如 '4g', 'wifi'
console.log("downlink:", connection.downlink); // 估算带宽
console.log("rtt(ms):", connection.rtt); // 估算RTT

connection.addEventListener("change", () => {
  console.log(
    "Connection change:",
    connection.effectiveType,
    connection.downlink,
    connection.rtt,
  );
});

