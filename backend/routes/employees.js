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
  const query = 'CALL FetchEmployees()'

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
    body('employee_name').notEmpty(),
    body('email').notEmpty(),
    body('position_id').notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      })
    }

    const employee_name = req.body.employee_name
    const email = req.body.email
    const position_id = req.body.position_id
    const query = 'CALL InsertEmployee(?, ?, ?)'

    connection.query(query, [employee_name, email, position_id], function (err, results) {
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
  const employee_id = req.params.id
  const query = 'CALL GetEmployeeById(?)'

  connection.query(query, [employee_id], function (err, results) {
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
    body('employee_name').notEmpty(),
    body('email').notEmpty(),
    body('position_id').notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      })
    }

    const employee_id = req.params.id
    const employee_name = req.body.employee_name
    const email = req.body.email
    const position_id = req.body.position_id
    const query = 'CALL UpdateEmployee(?, ?, ?, ?)'

    connection.query(query, [employee_id, employee_name, email, position_id], function (err, rows) {
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
router.delete('/delete/(:employee_id)', function (req, res) {
  const employee_id = req.params.employee_id
  const query = 'CALL DeleteEmployee(?)'

  connection.query(query, [employee_id], function (err, rows) {
    if (err) {
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
