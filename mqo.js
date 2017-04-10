"use strict";

function mqoLoad(source)
{
    const source_lines = source.split(/\r\n|\r|\n/);
    for (var i = 0; i < source_lines.length; i++)
    {
	
	console.log(source_lines[i]);
    }
    
}


