const Pool = require('pg').Pool
const pool = new Pool({
  user: 'dbuser',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
})


const getImages = (request, response) => {
	pool.query('SELECT * FROM images ORDER BY id ASC', (error, results) => {
		if (Error) {
			throw error
		}

		response.status(200).json(results.rows)
	})
}

const getImageById = (request, response) => {
	const id = praseInt(request.params.id)

	pool.query('SELECT * FROM images WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error
		}

		response.status(200).json(results.rows)
	})
}


const createImage = (request, response) => {
	const {url, name, date, size, medium, portfolio} = request.body

	pool.query('INSERT INTO images (url, name, date, size, medium, portfolio) VALUES ($1, $2, $3, $4, $5, $6)', [url, name, date, size, medium, portfolio], (error, results) => {
		if (error) {
			throw error
		}

		response.status(201).json(`Image added with ID: ${result.insertId}`)
	})
}

const updateImage = (request, response) => {
	const id = praseInt(request.params.id)
	const {url, name, date, size, medium, portfolio} = request.body

	pool.query('UPDATE images SET url = $1, name = $2, date=$3, size=$4, medium=$5, portfolio=$6 WHERE id = $3', [url, name, date, size, medium, portfolio, id], (error, results) => {
		if (error) {
			throw error
		}

		response.status(200).json(`Image modified with ID: ${id}`)
	})
}


const deleteImage = (request, response) => {
	const id = parseInt(request.params.id)

	pool.query('DELETE FROM images WHERE id = $1', [id], (error, results)=> {
		if (error) {
			throw error
		}

		response.status(200).send(`Image deleted with ID: ${id}`)
	})
}

module.exports = {
  getIamges,
  getImageById,
  createImage,
  updateImage,
  deleteImage,
}



