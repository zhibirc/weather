/**
 * API keys should stay private. So the original file containing secrets isn't exposed.
 * Instead there is template file (.env.tpl) where real data is replaced with fake random sequences.
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');

const envFile = fs.readFileSync(path.resolve(__dirname, '../.env')).toString();
const newData = envFile.replace(/(?<=API_KEY=).+$/gm, () => nanoid());

fs.writeFileSync(path.resolve(__dirname, '../.env.tpl'), newData);


