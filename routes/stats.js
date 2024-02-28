// admin.js
const express = require('express');
const bcrypt = require('bcrypt');
const dataModel = require('../models/dataModel');

const router = express.Router();


router.get('/stats', async (req, res) => {
  try {
    const companyStats = await dataModel.getCompanyStats();
    const cityStats = await  dataModel.getCityStats();
    const genderStats = await dataModel.getGenderStats();
    const incomeStats = await dataModel.getIncomeStats();
    const branchStats = await dataModel.getBranchStats();
    const offersStats = await dataModel.getOfferStats();

    res.json({
      companyStats: companyStats,
      cityStats: cityStats,
      genderStats: genderStats,
      incomeStats: incomeStats,
      branchStats: branchStats,
      offersStats: offersStats
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.redirect('/');
  }
});

router

module.exports = router;
