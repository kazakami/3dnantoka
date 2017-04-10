"use strict";

function mqoLoad(source)
{
    const source_lines = source.split(/\r\n|\r|\n/);
    for (var i = 0; i < source_lines.length; i++)
    {
        //マテリアルの読み込み
        if (source_lines[i].match(/\s*Material\s+\d+\s*{/))
        {
            console.log("mat start");
            while (i < source_lines.length)
            {                
                i++;
                //マテリアル読み込みの終了判定
                if (source_lines[i].match(/\s*}\s*/))
                {
                    i++;
                    console.log("mat ended.");
                    break;
                }
                console.log(source_lines[i]);
            }
        }
        //オブジェクトの読み込み
        if (source_lines[i].match(/\s*Object\s+".+"\s*{/))
        {
            console.log("obj start");
            while (i < source_lines.length)
            {                
                i++;
                //頂点の読み込み
                if (source_lines[i].match(/\s*vertex\s+\d+\s*{/))
                {
                    console.log("vertex start");
                    while (i < source_lines.length)
                    {
                        i++;
                        //頂点読み込みの終了判定
                        if (source_lines[i].match(/\s*}\s*/))
                        {
                            i++;
                            console.log("vertex ended.");
                            break;
                        }
                        console.log(source_lines[i]);
                    }
                }
                //面の読み込み
                if (source_lines[i].match(/\s*face\s+\d+\s*{/))
                {
                    console.log("face start");
                    while (i < source_lines.length)
                    {
                        i++;
                        //頂点読み込みの終了判定
                        if (source_lines[i].match(/\s*}\s*/))
                        {
                            i++;
                            console.log("face ended.");
                            break;
                        }
                        console.log(source_lines[i]);
                    }
                }
                //オブジェクト読み込みの終了判定
                if (source_lines[i].match(/\s*}\s*/))
                {
                    i++;
                    console.log("obj ended.")
                    break;
                }
                console.log(source_lines[i]);
            }
        }
	    // console.log(source_lines[i]);
    }
    
}


