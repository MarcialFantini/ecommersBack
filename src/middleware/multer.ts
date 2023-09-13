import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload"); // Asegúrate de que coincide con la carpeta de destino correcta
  },
  filename: (req, file, cb) => {
    // Configura cómo se nombran los archivos
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});

export const upload = multer({ storage: storage });
