#!/usr/bin/env node

import fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';
import commandLineArgs from "command-line-args";
import process from 'node:process';
import moment from "moment-timezone";
import slugify from "slugify";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const optionDefinitions = [
    {name: 'site', alias: 's'},
    {name: 'post', defaultOption: true},
    {name: 'images', alias: 'i', type: Boolean}
]

const options = commandLineArgs(optionDefinitions)

const hasImages  = options['images']

if (options['post'] === undefined) {
    console.error("Post title required")
    process.exit(1);
}

const title = options['post']

let prefix = ""

if (options['site'] === 'cso') {
    prefix = '../www_cso/'
} else if (options['site'] === 'smu') {
    prefix = '../www_smu/'
} else {
    console.error("Site must be one of 'cso' or 'smu'")
    process.exit(1);
}

const slug = slugify(title, {lower: true}).replace(/---/g, "-");

const date = moment.tz("Europe/Oslo");

const postPrefix = `${prefix}content/`

const folder = path.join(__dirname, postPrefix, date.format("YYYY/MM/DD"));
const filename = path.join(folder, `${slug}.md`);

let frontmatter = `---
title: ${title}
date: ${date.format("YYYY-MM-DD HH:mm ZZ")}
tags: 
intro: 
---
`;

if (hasImages) {
    frontmatter = `---
title: ${title}
date: ${date.format("YYYY-MM-DD HH:mm ZZ")}
tags: 
intro: 
image: /images/posts/${date.format("YYYY/MM/DD/")}
---
`;
}

console.log(`Creating post folder: ${folder}`);

fs.mkdir(folder, {recursive: true}, (err) => {
    if (err) {
        console.log(err.message);
    }

    console.log(`Creating post file: ${filename}`);

    fs.writeFile(filename, frontmatter, (err2) => {
        if (err2) {
            console.log(err2.message);
        }
    });
});

if (hasImages) {
    const imagePrefix = `${prefix}public/images/posts/`
    const imageFolder = path.join(__dirname, imagePrefix, date.format("YYYY/MM/DD"));

    console.log(`Creating image folder: ${imageFolder}`);

    fs.mkdir(imageFolder, {recursive: true}, (err) => {
        if (err) {
            console.log(err.message);
        }
    });
}