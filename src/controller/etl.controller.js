const express = require("express");
const db = require("../database");

const etlInserts = async (req, res) => {
  const sentence =
    "SELECT DISTINCT DATE(payment_date) AS 'date',YEAR(payment_date) AS 'year',MONTHNAME(payment_date) AS 'month_name',DAYOFMONTH(payment_date) AS 'day_of_month',DAYNAME(payment_date) AS 'day_of_week' FROM sakila.payment UNION SELECT DISTINCT DATE(rental_date) AS 'date', YEAR(rental_date) AS 'year', MONTHNAME(rental_date) AS 'month_name', DAYOFMONTH(rental_date) AS 'day_of_month', DAYNAME(rental_date) AS 'day_of_week' FROM sakila.rental UNION SELECT DISTINCT DATE(inv.last_update) AS 'date', YEAR(inv.last_update) AS 'year', MONTHNAME(inv.last_update) AS 'month_name', DAYOFMONTH(inv.last_update) AS 'day_of_month', DAYNAME(inv.last_update) AS 'day_of_week' FROM sakila.inventory AS inv;";
  const querySelect = await db.query(sentence);

  if (querySelect) {
    insertElements(querySelect);

    return res.status(200).json(querySelect);
  }

  return res.status(400).json({ msg: "Error to create ETL" });
};

const insertElements = async (querySelect) => {
  try {
    querySelect.forEach(async (element) => {
      const month = new Date(element.date).getMonth() + 1;
      const date = element.year + "-" + month + "-" + element.day_of_month;
      const newElements = await db.query(
        `INSERT IGNORE INTO sakila_dw.dim_date VALUE('${date}', ${element.year}, '${element.month_name}', ${element.day_of_month}, '${element.day_of_week}');`
      );
      //   if (newElements.OkPacket.serverStatus !== 2) {
      //     return res.status(500).json({ msg: "Error to insert items" });
      //   }
    });
  } catch (e) {
    console.log("Error while trying to insert");
    return false;
  }
};

module.exports = {
  etlInserts,
};
