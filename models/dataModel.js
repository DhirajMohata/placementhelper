// adminModel.js
const { dbPool } = require('../config/db');

const getData = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT * FROM studentplacement', (err, student) => {
      if (err) {
        reject(err);
      }
      resolve(student);
    });
  });
};

const getCompanyStats = () => { 
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT CompanyName, COUNT(*) AS num_students_placed FROM studentplacement GROUP BY CompanyName', (err, company) => {
      if (err) {
        reject(err);
      }
      console.log(company);
      resolve(company);
    });
  });
}
 const getCityStats = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT JobLocation , COUNT(*) AS num_students_placed FROM studentplacement GROUP BY JobLocation', (err, city) => {
      if (err) {
        reject(err);
      }
      console.log(city);
      resolve(city);
    });
  });
}

const getGenderStats = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT Gender, COUNT(*) AS num_students_placed FROM studentplacement GROUP BY Gender', (err, city) => {
      if (err) {
        reject(err);
      }
      console.log(city);
      resolve(city);
    });
  });
}

const getIncomeStats = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT AnnualSalary, COUNT(*) AS num_students_placed FROM studentplacement GROUP BY AnnualSalary', (err, city) => {
      if (err) {
        reject(err);
      }
      console.log(city);
      resolve(city);
    });
  });
}

const getOfferStats = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT OfferLetterReceived, COUNT(*) AS num_students_placed FROM studentplacement GROUP BY OfferLetterReceived', (err, city) => {
      if (err) {
        reject(err);
      }
      console.log(city);
      resolve(city);
    });
  });
}

const getBranchStats = () => {
  return new Promise((resolve, reject) => {
    dbPool.query('SELECT CourseAndBranch, COUNT(*) AS num_students_placed FROM studentplacement GROUP BY CourseAndBranch', (err, city) => {
      if (err) {
        reject(err);
      }
      console.log(city);
      resolve(city);
    });
  });
}

module.exports = {
    getCompanyStats,
    getCityStats,
    getGenderStats,
    getIncomeStats,
    getBranchStats,
    getOfferStats
};
