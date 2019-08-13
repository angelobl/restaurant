const express = require("express");
const router = express.Router();
const _ = require("lodash");
const userController = require("../controllers/users");

const listUser = [];

router.get("/", (req, res) => {
  userController.list().then(
    listUser => {
      res.json(listUser);
    },
    err => {
      res.status(500).json(err);
    }
  );
});

router.get("/:userId/show", async (req, res) => {
  try {
    const { userId } = req.params;
    const userSelect = await userController.listUser(userId);
    console.log(userSelect);

    return res.json(userSelect);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Usuario no encontrado", data: error });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    //const resultIndex = listUser.findIndex(user => user.id === Number(userId));

    await userController.deleteUser(userId);
    return res.json({
      ok: true,
      data: {
        message: "Usuario eliminado"
      }
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      data: {
        message: "Usuario no encontrado"
      }
    });
  }

  /*
  if (resultIndex >= 0) {
    listUser.splice(resultIndex, 1);
    return res.json({
      ok: true,
      data: {
        message: "Usuario eliminado"
      }
    });
  }
  return res.status(500).json({
    ok: false,
    data: {
      message: "Usuario no encontrado"
    }
  });*/
});

router.put("/:userId", async (req, res) => {
 try {const { userId } = req.params;
  //const resultIndex = listUser.findIndex(user => user.id === Number(userId));
  await userController.updateUser(userId,req.body);
  return res.json({
    ok: true,
    data: {
      message: "Usuario modificado"
    }
  });
} catch (error) {
  return res.status(500).json({
    ok: false,
    data: {
      message: "Usuario no encontrado"
    }
  })
}

  /*
  if (resultIndex >= 0) {
    const { name, lastname } = req.body;
    listUser[resultIndex] = {
      id: Number(userId),
      name,
      lastname: lastname || ""
    };

    return res.json({
      ok: true,
      data: {
        message: "Usuario modificado"
      }
    });
  }
  return res.status(500).json({
    ok: false,
    data: {
      message: "Usuario no encontrado"
    }
  });*/
});

router.post("/", async (req, res) => {
  try {
    const { name, lastname, email, password } = req.body;
    await userController.store(name, lastname, email, password);
    return res.json({
      ok: true,
      data: {
        message: "Usuario agregado"
      }
    });
  } catch (error) {
    res.status(500).json({
      ok: true,
      data: err
    });
  }

  /*
  userController.store(name, lastname).then(
    () => {
      return res.json({
        ok: true,
        data: {
          message: "Usuario agregado"
        }
      });
    },
    err => {
      res.status(500).json({
        ok: true,
        data: err
      });
    }
  );
  */
});

module.exports = router;
