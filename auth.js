import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import models from "./models";

const auth = {
  checkHeaders: async (req, res, next) => {
    const token = req.headers["x-token"];

    if (token) {
      try {
        const { user } = jwt.verify(token, process.env.SECRET);
        req.user = user;
      } catch (error) {
        const newToken = await auth.checkToken(token);
        req.user = newToken.user;

        if (newToken.token) {
          res.set("Access-Control-Expose-Headers", "x-token");
          res.set("x-token", newToken.token);
        }
      }
    }
    next();
  },

  checkToken: async token => {
    let idUser = null;

    try {
      const { user } = await jwt.decode(token);
      idUser = user;
    } catch (error) {
      return {};
    }

    const user = await models.User.findOne({ where: { id: idUser } });
    const [newToken] = auth.getToken(user);

    return {
      user: user.id,
      token: newToken
    };
  },

  getToken: ({ id }) => {
    const newToken = jwt.sign({ user: id }, process.env.SECRET, {
      expiresIn: "5d"
    });

    return [newToken];
  },

  login: async (email, password, User) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return {
        success: false,
        errors: [
          {
            path: "email",
            message: "El correo no corresponde a ninguno de nuestros usuarios."
          }
        ]
      };
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return {
        success: false,
        errors: [{ path: "password", message: "Contraseña inválida" }]
      };
    }

    const [newToken] = auth.getToken(user);

    return {
      success: true,
      token: newToken,
      errors: []
    };
  }
};

export default auth;
