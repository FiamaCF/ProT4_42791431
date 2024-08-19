import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query ('SELECT * FROM Libros');
        res.json(result);
    }

    async add(req, res){
        const Libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, fecha_publicacion, isbn) VALUES (?, ?, ?, ?, ?)`, [Libro.nombre, Libro.autor, Libro.categoria, Libro.fecha_publicacion, Libro.isbn]);
        res.json({"Id insertado": result.insertId});
    }

async delete(req, res){
    const Libro = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE isbn=(?)`, [Libro.isbn]);
    res.json({"Registros eliminados": result.affectedRows});
}

async update(req, res){
    const Libro = req.body;
    const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), fecha_publicacion=(?), isbn=(?) WHERE id =(?)`, [Libro.nombre, Libro.autor, Libro.categoria, Libro.fecha_publicacion, Libro.isbn]);
    res.json({"Registros actualizados": result.changedRows});
}

async getOne(req, res){
    const Libro = req.body;
    const { id } = Libro;

    try {
        const [result] = await pool.query(`SELECT * FROM Libros WHERE id =(?)`, [id]);

        if (result.length === 0) {
            res.status(404).json({ message: "Libro no encontrado"});
        } else {
            res.json(result[0]);
        }
    } catch (error){
        res.status(500).json({ message:"Error al obtener el Libro"})
    }
}
}

export const Libro = new LibroController();