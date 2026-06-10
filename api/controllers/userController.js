const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



const register = async (req, res) => {
    try {
  
      const {name,surname,email,password,institutionCode} = req.body;
  
      if (!name ||!surname ||!email ||!password ||!institutionCode) {
        return res.status(400).json({
          message: 'Faltan datos obligatorios'
        });
      }
  
      const passwordRegex =/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  
      if (!passwordRegex.test(password)) {
        return res.status(400).json({
          message: 'La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número'
        });
      }
  
      const [existingEmail] = await db.query('SELECT id FROM users WHERE email = ?',[email]);
  
      if (existingEmail.length > 0) {
        return res.status(409).json({
          message: 'El email ya existe'
        });
      }
  
      const [institutions] = await db.query(
        'SELECT id, access_code_hash FROM institutions WHERE active = 1'
      );
      console.log(institutions);
  
      let institutionId = null;
  
      for (const institution of institutions) {
  
       // const validCode = await bcrypt.compare(
       //   institutionCode,
       //   institution.access_code_hash
        // );
        
        const validCode = institutionCode === institution.access_code_hash;
  
        if (validCode) {
          institutionId = institution.id;
          break;
        }
      }
  
      if (!institutionId) {
        return res.status(400).json({
          message: 'Código institucional inválido'
        });
      }
  
      const password_hash = await bcrypt.hash(
        password,
        10
      );
  
      const [result] = await db.query(`INSERT INTO users ( institution_id, role, email, password_hash, name, surname)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [institutionId,'student',email,password_hash,name,surname]);
  
      return res.status(201).json({
        message: 'Usuario registrado correctamente',
        userId: result.insertId
      });
  
    } catch (error) {
  
      console.error(error);
  
      return res.status(500).json({
        message: 'Error interno del servidor'
      });
  
    }
};


const login = async (req, res) => {
    try {
  
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({
          message: 'Email y contraseña obligatorios'
        });
      }
  
      const [users] = await db.query(
        `SELECT id, email,password_hash, role, institution_id FROM users WHERE email = ?`,[email] );
  
      if (users.length === 0) {
        return res.status(401).json({
          message: 'Email o contraseña incorrecta'
        });
      }
  
      const user = users[0];
  
      const validPassword = await bcrypt.compare(password, user.password_hash);
  
      if (!validPassword) {
        return res.status(401).json({
          message: 'Email o contraseña incorrecta'
        });
      }
  
      await db.query('UPDATE users SET last_login_at = NOW() WHERE id = ?',[user.id]);
  
      const token = jwt.sign(
        {
          user_id: user.id,
          role: user.role,
          institution_id: user.institution_id
        },
        process.env.SECRET,
        {
          expiresIn: '8h'
        }
      );
  
      return res.status(200).json({
        message: 'Logueo exitoso',
        token,
        role: user.role
      });
  
    } catch (error) {
  
      console.error(error);
  
      return res.status(500).json({
        message: 'Error interno del servidor'
      });
  
    }
};

module.exports = {
  register,
  login
};