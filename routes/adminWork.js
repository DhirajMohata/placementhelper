const express = require('express')
const {dbPool} = require('../config/db')
const ExcelJS = require('exceljs');
const flash = require('connect-flash')

const router = express.Router()

router.post('/Notice', (req, res) => {
    const notice1 ={
      title : req.body.title,
      notice : req.body.notice
    };
  
    dbPool.query('INSERT INTO notice SET ?', notice1, (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.redirect("/");
      }
      flash('success_msg', 'Notice added successfully')
      console.log('Data inserted successfully!');
      res.redirect("/admin")
    });  
  });

  router.get('/download/:companyName', (req, res) => {
    const companyName = req.params.companyName;
  
    const query = `SELECT * FROM applied WHERE companyName = ?`;
  
    dbPool.query(query, [companyName], (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
  
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Applications');
  
      worksheet.columns = [
        { header: 'Student Email', key: 'studentEmail', width: 20 },
        { header: 'Student Name', key: 'studentName', width: 20 },
        { header: 'Company Email', key: 'companyEmail', width: 20 },
        { header: 'Company Name', key: 'companyName', width: 20 },
        { header: 'Student Enrollment', key: 'studentEnrollment', width: 20 },
        { header: 'Next Round', key: 'next', width: 20 },
        { header: 'Round Selected', key: 'selected', width: 20 },
      ];
  
      results.forEach((result) => {
        worksheet.addRow(result);
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${companyName}_applications.xlsx`);
  
      // Pipe the workbook to the response
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    });
  });

  router.get('/download-verified-student/', (req, res) => {
  
    const query = `SELECT name, email, enrollment FROM student WHERE allow = 1`;
  
    dbPool.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Applications');
  
      worksheet.columns = [
        { header: 'Student Name', key: 'name', width: 20 },
        { header: 'Student Email', key: 'email', width: 20 },
        { header: 'Student Enrollment', key: 'enrollment', width: 20 },
      ];
  
      results.forEach((result) => {
        worksheet.addRow(result);
      });
  
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=Verified_Student_data.xlsx`);
  
      // Pipe the workbook to the response
      workbook.xlsx.write(res).then(() => {
        res.end();
      });
    });
  });

  
  

module.exports = router