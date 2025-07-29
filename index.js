const express = require('express');
const app = express();
app.use(express.json());

const USER_ID = 'john_doe_17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

function isNumber(str) {
    return /^-?\d+$/.test(str);
}

function isAlphabet(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function alternateCaps(str) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        result += i % 2 === 0 ? str[i].toUpperCase() : str[i].toLowerCase();
    }
    return result;
}

app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, message: 'Invalid input' });
        }

        const even_numbers = [];
        const odd_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        let alpha_concat = '';

        data.forEach(item => {
            if (isNumber(item)) {
                const num = parseInt(item, 10);
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
                sum += num;
            } else if (isAlphabet(item)) {
                alphabets.push(item.toUpperCase());
                alpha_concat += item;
            } else {
                special_characters.push(item);
            }
        });

        const reversedAlpha = alpha_concat.split('').reverse().join('');
        const concat_string = alternateCaps(reversedAlpha);

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            odd_numbers,
            even_numbers,
            alphabets,
            special_characters: special_characters,
            sum: sum.toString(),
            concat_string
        });
    } catch (err) {
        res.status(500).json({ is_success: false, message: 'Server error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 