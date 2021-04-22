const express = require("express");
const app = express();

// app.use(express.static("./assets/dist/js/bootstrap.bundle.min.js"));

app.listen(8080, function () {
  // 8080포트 서버를 열고 연다음 함수 안에 있는 것을 실행해주세요.
  console.log("test");
});

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

// localhost:8080/pet 으로  클라이언트가 접속하면 get 요청을 통해 서버에 response를 응답받는다.
app.get("/pet", function (req, res) {
  res.send("여기는 펫 페이지입니다.");
});

// 이번엔 뷰티 페이지로 접속한 사람에게 get요청을 응답해준다.
app.get("/beauty", function (req, res) {
  res.send("여기는 뷰티 페이지입니다.");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});
