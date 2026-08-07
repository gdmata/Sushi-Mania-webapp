const express = require('express')

const getMenuItems = async (req, res) => {
  try {
    const db = req.app.locals.db
    const { category } = req.query

    const query = category ? { category: category } : {}
    const items = await db.collection('Menu').find(query).toArray()

    res.status(200).json({ count: items.lenght, items })
  } catch (error) {
    res.status(500).json({ message: 'Error' + error.message })
  }
}

module.exports = { getMenuItems }
