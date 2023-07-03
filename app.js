const http = require("http");
const fs = require("fs");

const saveNewUser = (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    const parsedData = JSON.parse(data);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const formData = new URLSearchParams(body);
      const username = formData.get("username");
      const position = formData.get("position");
      parsedData.push({ username, position });
      fs.writeFile("users.json", JSON.stringify(parsedData), (err) => {
        console.log(parsedData);
        if (err) {
          res.write(`<html>
            <head>
              <title>Saved User</title>
            </head>
            <body>
              <h1>ERROR ${err} !!!</h1>
              <ul style={display:inline;}>
              <li><a href="/"><button>Check List of Users</button></a></li>
              <li><a href="/createNewUser"><button>Or Try Creating a New User</button></a></li>
              </ul>
            </body>
          </html>`);
        } else {
          res.write(`<html>
            <head>
              <title>Saved User</title>
            </head>
            <body>
              <h1>User was Created and Added</h1>
              <ul style={display:inline;}>
              <li><a href="/users"><button>Check Updated Users List</button></a></li>
              <li><a href="/createNewUser"><button>Or Create Another User</button></a></li>
              </ul>
            </body>
          </html>`);
          return res.end();
        }
      });
    });
  });
};

const server = http.createServer((req, res) => {
  let htmlContent = "";
  if (req.url === "/users" && req.method === "GET") {
    let data = fs.readFileSync("./users.json");
    JSON.parse(data).forEach((element) => {
      htmlContent += `<li>Username: ${element.username} | Position: ${element.position}</li>`;
    });
    htmlContent = `<ul>${htmlContent}</ul>\n<button><a href="http://localhost:3000/createNewUser">Create new user</a></button>`;

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlContent);
  }
  if (req.url === "/" && req.method === "GET") {
    res.write(
      '<h1>You requested the site on : <a href="http://localhost:3000">localhost:3000</a></h1>\n<button><a href="http://localhost:3000/users">Get list of users</a></button>'
    );
    res.end();
  }
  if (req.url === "/createNewUser" && req.method === "GET") {
    res.write(`<html>
          <head>
            <title>List of Users</title>
          </head>
          <body>
            <h1>New User Data</h1>
            <form method="POST" action="/saveNewUser">
            <label for="username">UserName: </label>
            <input type="text" name="username" id="username" />
            <label for="position">Position: </label>
            <input type="text" name="position" id="position" />
            <button type="submit">Create New User</button>
          </form>
          </body>
        </html>`);
    res.statusCode = 201;
    return res.end();
  }
  if (req.url === "/saveNewUser" && req.method === "POST") {
    saveNewUser(req, res);
  }
});

const port = 3000;

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`You can access the site on url: localhost:${port}`);
});
