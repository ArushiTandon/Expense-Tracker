const db = require('../util/database');
const { QueryTypes } = require('sequelize');

exports.getExpenses = async (req, res) => {
    try{
        const[rows] = await db.query('SELECT * FROM expenses');
        res.status(200).json(rows);
    } catch(err){
        res.status(500).json({error: err.message});
    }
}

exports.addExpense = async(req, res) => {
    const {amount, description, category} = req.body;
    try{

        console.log("Request Body:", req.body);

        const[result] = await db.query(
            'INSERT INTO expenses (amount, description, category) VALUES (?, ?, ?)',
            {
                replacements: [amount, description, category],
                type: QueryTypes.INSERT,
            });
        res.status(201).json({id: result.insertId});
    } catch(err){
        console.error("Database Error:", err);
        res.status(500).json({error: err.message});
    }
};

exports.deleteExpense = async(req, res) => {
    const {id} = req.params;
    try{
        await db.query('DELETE FROM expenses WHERE id = ?', {
            replacements: [id],
            type: QueryTypes.DELETE,
        });
        res.status(200).send('Expense Deleted');
    } catch(err){
        console.error("Error:", err);
        res.status(500).json({error: err.message});
    }
}

exports.updateExpense = async (req, res) => {
    const { id } = req.params; // Extract ID from URL parameters
    const { amount, description, category } = req.body; // Extract data from the request body

    try {
        // Check if the expense exists in the database
        const [existingExpense] = await db.query('SELECT * FROM expenses WHERE id = ?', {
            replacements: [id],
            type: QueryTypes.SELECT,
        });

        if (!existingExpense) {
            // If no expense found, return 404 error
            return res.status(404).json({ error: 'Expense not found' });
        }

        // Update the expense with the provided values
        const [result] = await db.query(
            'UPDATE expenses SET amount = ?, description = ?, category = ? WHERE id = ?',
            {
                replacements: [amount, description, category, id],
                type: QueryTypes.UPDATE,
            }
        );

        res.status(200).json({ message: 'Expense updated successfully' });
    } catch (err) {
        // Handle errors and return 500 Internal Server Error
        console.error("Error updating expense:", err);
        res.status(500).json({ error: err.message });
    }
};
