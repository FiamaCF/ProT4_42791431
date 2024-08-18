import {pool} from './database.js';

class LibroController{

    async getAll(req, res) {
        const [result] = await pool.query ('SELECT * FROM Libros');
        res.json(result);
    }

    async add(req, res){
        const Libro = req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, año-publicacion, ISBN) VALUES (?, ?, ?, ?, ?)`, [Libro.nombre, Libro.autor, Libro.categoria, Libro.año-publicacion, Libro.ISBN]);
        res.json({"Id insertado": result.insertId});
    }

async delete(req, res){
    const Libro = req.body;
    const [result] = await pool.query(`DELETE FROM Libros WHERE id=(?)`, [Libro.id]);
    res.json({"Registros eliminados": result.affectedRows});
}

async update(req, res){
    const Libro = req.body;
    const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), año-publicacion=(?), ISBN=(?) WHERE id =(?)`, [Libro.nombre, Libro.autor, Libro.categoria, Libro.año-publicacion, Libro.ISBN]);
    res.json({"Registros actualizados": result.changedRows});
}
}

export const Libro = new LibroController();