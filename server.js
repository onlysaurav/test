const express = require("express");
const thesaurus = require("thesaurus");
const app = express();
const port = 3000;
const data = require("./user.json");
const fs = require("fs");
const readline = require("readline");
const axios = require("axios");
const { reverse } = require("lodash");

// Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----------------------------------------Technical Task - 1----------------------------------------------------------
// app.post('/process', (req, res) => {
//     const { text } = req.body;

//     // Split the input text into words
//     const words = text.split(' ');

//     // Find synonyms for each word using thesaurus
//     const synonyms = words.map(word => thesaurus.find(word) || word);

//     // Join the synonyms back into a single text
//     const result = synonyms.join(' ');

//     // Send the resulting text back to the client
//     res.send(result);
//   });

// ---------------------------------------------Technical Task - 2-------------------------------------------------------
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// console.log('Welcome! Enter a calculation, I\'ll give you the answer.');

// rl.on('line', (input) => {
//   if (input === 'exit') {
//     console.log('Goodbye!');
//     rl.close();
//   } else {
//     const result = evaluateExpression(input);
//     console.log(`= ${result}`);
//   }
// });

// function evaluateExpression(expression) {
//   const regex = /\s*([+\-*/])\s*/;
//   const parts = expression.split(regex);
//   console.log("parts", parts)
//   const operators = parts.filter((_, index) => index % 2 === 1);
//   console.log("Operators", operators,operators.length)
//   const operands = parts.filter((_, index) => index % 2 === 0).map(parseFloat);
//   console.log("Operands", operands)
//   if (operands.some(isNaN) || operands.length - operators.length !== 1) {
//     return NaN;
//   }

//   let result = operands[0];
// console.log("result",result)
//   for (let i = 0; i < operators.length; i++) {
//   console.log("Loop",i)
//     const operator = operators[i];
//     console.log("operator", operator)
//     const operand = operands[i + 1];
//     console.log("operand", operand)
//     switch (operator) {
//       case '+':
//         result += operand;
//         break;
//       case '-':
//         result -= operand;
//         break;
//       case '*':
//       case 'x':
//         result *= operand;
//         break;
//       case '/':
//         if (operand === 0) {
//           return NaN;
//         }
//         result /= operand;
//         break;
//       default:
//         return NaN;
//     }
//   }

//   return result;
// }

// ---------------------------------Technical Task - 3--------------------------------------------------------------
// const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
// const DOMAIN_REGEX = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/.*)?$/;
// app.post('/avatar', async (req, res) => {
//     const { input } = req.body;

//     if (!input) {
//       return res.status(400).json({ error: 'No input provided' });
//     }

//     let imageUrl;
//     let type;

//     if (EMAIL_REGEX.test(input)) {
//       imageUrl = getGravatarUrl(input);
//       type = 'Email';
//     } else if (DOMAIN_REGEX.test(input)) {
//       try {
//         const domain = input.match(DOMAIN_REGEX)[2];
//         const company = await getCompanyName(domain);
//         imageUrl = company.logo;
//         type = 'Website';
//       } catch (error) {
//         return res.status(404).json({ error: 'Company not found' });
//       }
//     } else {
//       return res.status(400).json({ error: 'Invalid input' });
//     }

//     res.json({ input, type, imageUrl });
//   });

//   function getGravatarUrl(email) {
//     const hash = require('crypto').createHash('md5').update(email.trim().toLowerCase()).digest('hex');
//     return `https://www.gravatar.com/avatar/${hash}?d=identicon`;
//   }

//   async function getCompanyName(domain) {
//     const apiKey = 'sk_2b39528634151f59e7059ffe09111894';
//     const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${encodeURIComponent(domain)}`;

//     const response = await axios.get(url, {
//       headers: {
//         Authorization: `Bearer ${apiKey}`
//       }
//     });

//     if (response.data.length > 0) {
//       return response.data[0];
//     } else {
//       throw new Error('Company not found');
//     }
//   }

// ----------------Common Task - 1------------------------------------------------------
// One of my most memorable experiences with one of my parents took place during a family vacation to a picturesque mountainous region.We decided to go hiking on a scenic trail that led to a breathtaking waterfall.It was a sunny day, and the air was filled with the sweet aroma of wildflowers and the refreshing mist from the cascading water.

// What made this experience special was the presence of my father.He has always been an avid nature lover and a passionate hiker.His enthusiasm for exploring the great outdoors was infectious, and he never failed to instill a sense of wonder and appreciation for the natural world in me.

// As we hiked together, my father shared his extensive knowledge about the local flora and fauna, pointing out various plants, birds, and animals along the way.He effortlessly transformed the hike into an educational and enjoyable adventure.His passion and deep connection with nature were evident in every word he spoke and the excitement in his eyes.

// What made this experience truly memorable was the quality time we spent together.Away from the distractions of everyday life, we were able to bond, have meaningful conversations, and create lasting memories.The beauty of the surroundings and my father's unwavering love for nature served as a backdrop for our connection.

// Years later, I still vividly remember the joy of that day—the sound of rushing water, the warmth of the sun on our faces, and the sense of awe and gratitude I felt in the presence of my father.It was a reminder of the immense value of spending time with loved ones, cherishing the beauty of nature, and nurturing a sense of curiosity and wonder.

// -----------------------Common Task - 2---------------------------------------------------
// In my imagination, the coolest computing device would be a highly advanced artificial intelligence(AI) companion integrated into a sleek and portable device.This AI companion would possess an unparalleled level of intelligence, adaptability, and emotional understanding.It would be capable of understanding and conversing in multiple languages, adapting to individual preferences and learning patterns, and even exhibiting a sense of humor and creativity.

// This remarkable technology would go beyond the conventional boundaries of computing.It would serve as a personal assistant, helping with tasks such as organizing schedules, managing personal finances, and providing personalized recommendations based on individual preferences and interests.The AI companion would be an expert in various fields, providing instant access to vast knowledge and acting as a mentor or tutor.
// Express Server

// function reverseString(str) {
//   let emptyString = ''
//   for (let char of str) {
//     console.log('emptyString',emptyString)
//     let reverse = char + emptyString;
//     console.log('emptyString',reverse)
//   }
//   return reverse;
// }
// let str = "hello";
// console.log(reverseString(str));


// const function(){
  
// }

// server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});