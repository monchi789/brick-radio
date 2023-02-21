import express from 'express';
import payload from 'payload';
import indexRoutes from "./routes/index.routes";
import path from 'path';
import { fileURLToPath } from "url";

require('dotenv').config();
const app = express();

// Establecer el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Establecer las rutas
app.use(indexRoutes);

// Establecer el CSS
app.use(express.static(path.join(__dirname, 'public')))

const start = async () => {
  // Initialize Payload
  await payload.init({
    secret: process.env.PAYLOAD_SECRET,
    mongoURL: process.env.MONGODB_URI,
    express: app,
    onInit: async () => {
      payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
    },
  })

  // Add your own express routes here

  app.listen(3000);
}

start();
