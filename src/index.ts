import cors from "cors-ts";
import express from "express";
import endpointsConfig from "./endpoints.config";
import executeDBScript from "./config/database";
import router from "./routes";
import helmet from "helmet";
const port = endpointsConfig.port;
const app = express();
app.use(cors());
app.use(helmet())
app.listen(port, () => {
  console.log(`server listening on port: ${port}`);
});
executeDBScript("Select version()")
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
app.use("/",router);

