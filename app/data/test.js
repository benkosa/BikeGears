import  cogs_1  from './cogs-1.js';
import  cogs_2  from './cogs-2.js';
import  cogs_3  from './cogs-3.js';
import  cogs_4  from './cogs-4.js';
import  cogs_5  from './cogs-5.js';
import  cogs_6  from './cogs-6.js';
import  cogs_7  from './cogs-7.js';
import  cogs_8  from './cogs-8.js';
import  cogs_9  from './cogs-9.js';
import  cogs_10  from './cogs-10.js';
import  cogs_11  from './cogs-11.js';
import  cogs_12  from './cogs-12.js';
import  cogs_13  from './cogs-13.js';
import  crank_1  from './crank-1.js';
import  crank_2  from './crank-2.js';
import  crank_3  from './crank-3.js';


let unique = [];

for (let i = 0; i < crank_3.tbody.tr.length; i++) {
    const element = crank_3.tbody.tr[i];
    let found = false;
    if(element.th == {} || element.th == "" || element.th == "Custom name" || element.th == "null" || typeof element.th === 'object')
        continue;
    for (let j = 0; j < unique.length; j++) {
        const uelement = unique[j];
        if(element.td == uelement.td) {
            found = true;
            break;
        }
    }
    if(!found) {
        unique.push(element)
    }
}

//unique.sort((a,b) => (a.td > b.td) ? 1 : ((b.td > a.td) ? -1 : 0))

const cog = process.argv[2];

console.log("const crank_"+cog+" = " + JSON.stringify(unique) + "\nexport default crank_"+cog);