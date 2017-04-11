"use strict";

function mqoLoad(source)
{
    const source_lines = source.split(/\r\n|\r|\n/);
    for (var i = 0; i < source_lines.length; i++)
    {
        //マテリアルの読み込み開始判定
        var material_match = source_lines[i].match(/\s*Material\s+(\d+)\s*{/);
        if (material_match)
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
                //マテリアルの表現の例： "mat1" shader(3) col(1.000 1.000 1.000 1.000) dif(0.800) amb(0.600) emi(0.000) spc(0.000) power(5.00)
                var mat_match = source_lines[i].match(/"(.+)"\s*shader\(\s*(\d+)\s*\)\s*col\(\s*(\d+\.\d+)\s*(\d+\.\d+)\s*(\d+\.\d+)\s*(\d+\.\d+)\s*\)\s*dif\(\s*(\d+\.\d+)\s*\)\s*amb\(\s*(\d+\.\d+)\s*\)\s*emi\(\s*(\d+\.\d+)\s*\)\s*spc\(\s*(\d+\.\d+)\s*\)\s*power\(\s*(\d+\.\d+)\s*\)\s*/);
                if (mat_match)
                {
                    /*
                    console.log(source_lines[i]);
                    console.log(mat_match[2]);
                    */
                }
                else
                {
                    alert("err in reading match");
                }
            }
        }
        //オブジェクトの読み込み開始判定
        var object_match = source_lines[i].match(/\s*Object\s+"(.+)"\s*{/);
        if (object_match)
        {
            console.log("obj start");
            console.log(object_match[1])
            while (i < source_lines.length)
            {                
                i++;
                //頂点の読み込み開始判定
                var vertex_match = source_lines[i].match(/\s*vertex\s+(\d+)\s*{/);
                if (vertex_match)
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
                        //3次元座標の例: -100 100 100
                        var coord3_match = source_lines[i].match(/\s*(-?\d+)\s+(-?\d+)\s+(-?\d+)\s*/);
                        if (coord3_match)
                        {
                            /*
                            console.log("coord: " + coord3_match[1] + ", " + coord3_match[2] + ", " + coord3_match[3])
                            */
                        }
                        else
                        {
                            alert("err in reading coord");
                        }
                    }
                }
                //面の読み込み開始判定
                var face_match = source_lines[i].match(/\s*face\s+(\d+)\s*{/);
                if (face_match)
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
                        //4頂点の面の例: 4 V(0 2 3 1) M(0) UV(0 0 1 0 1 1 0 1)
                        var four_vert_face_match = source_lines[i].match(/4\s+V\(\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\)\s*M\((\d+)\)\s*UV\(\s*(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s*\)/);
                        if (four_vert_face_match)
                        {
                            /*
                            console.log(source_lines[i]);
                            console.log(four_vert_face_match[1] + ", " + four_vert_face_match[2] + ", " + four_vert_face_match[3] + ", " + four_vert_face_match[4]);
                            console.log(four_vert_face_match[5]);
                            console.log(four_vert_face_match[6] + ", " + four_vert_face_match[7] + ", " +
                                four_vert_face_match[8] + ", " + four_vert_face_match[9] + ", " +
                                four_vert_face_match[10] + ", " + four_vert_face_match[11] + ", " +
                                four_vert_face_match[12] + ", " + four_vert_face_match[13]);
                                */
                        }
                        else
                        {
                            alert("err in reading face");
                        }
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


