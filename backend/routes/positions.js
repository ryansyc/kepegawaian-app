const express = require('express')
const router = express.Router()

// import express validator
const { body, validationResult } = require('express-validator')

// import database
const connection = require('../config/database')

/**
 * INDEX
 */
router.get('/', function (req, res) {
  const query = 'CALL FetchPositions()'

  connection.query(query, function (err, results) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    } else {
      const rows = results[0]
      return res.status(200).json({
        status: true,
        data: rows,
      })
    }
  })
})

/**
 * STORE
 */
router.post(
  '/store',
  [
    // validation
    body('position_name').notEmpty(),
    body('salary').notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      })
    }

    const position_name = req.body.position_name
    const salary = req.body.salary
    const query = 'CALL InsertPosition(?, ?)'

    connection.query(query, [position_name, salary], function (err, results) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        })
      } else {
        const rows = results[0]
        return res.status(201).json({
          status: true,
          message: 'Insert Data Successfully',
          data: rows,
        })
      }
    })
  }
)

/**
 * SHOW
 */
router.get('/(:id)', function (req, res) {
  const position_id = req.params.id
  const query = 'CALL GetPositionById(?)'

  connection.query(query, [position_id], function (err, results) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    }
    if (results.length <= 0) {
      return res.status(404).json({
        status: false,
        message: 'Data Not Found!',
      })
    } else {
      const rows = results[0][0]
      return res.status(200).json({
        status: true,
        message: 'Detail Data',
        data: rows,
      })
    }
  })
})

/**
 * UPDATE POST
 */
router.patch(
  '/update/:id',
  [
    //validation
    body('position_name').notEmpty(),
    body('salary').notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      })
    }

    const position_id = req.params.id
    const position_name = req.body.position_name
    const salary = req.body.salary
    const query = 'CALL UpdatePosition(?, ?, ?)'

    connection.query(query, [position_id, position_name, salary], function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: 'Internal Server Error',
        })
      } else {
        return res.status(200).json({
          status: true,
          message: 'Update Data Successfully!',
        })
      }
    })
  }
)

/**
 * DELETE POST
 */
router.delete('/delete/(:position_id)', function (req, res) {
  const position_id = req.params.position_id
  const query = 'CALL DeletePosition(?)'

  connection.query(query, [position_id], function (err, rows) {
    if (err.code === 'ER_SIGNAL_EXCEPTION') {
      return res.status(403).json({
        status: false,
        message: 'Tidak dapat dihapus! Masih ada pegawai yang memiliki posisi ini.',
      })
    } else if (err) {
      return res.status(500).json({
        status: false,
        message: 'Internal Server Error',
      })
    } else {
      return res.status(200).json({
        status: true,
        message: 'Delete Data Successfully!',
      })
    }
  })
})

module.exports = router
