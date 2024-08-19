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
}

export const Libro = new LibroController();