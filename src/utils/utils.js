
// 将颜色的数值化为十六进制字符串表示
export function RRGGBB(color){

	let t = Number(color).toString(16).toUpperCase();
    if (t.length > 6) {
        t = t.substring(0, 6);
    }
    return Array(7 - t.length).join('0') + t;
}


//获取时间长度
export function lengthTransform (video_length) {
        let result = video_length.match(/\d{2,3}/g);
        return result.reduce(function (prev, cur, item, array) {
            return parseInt(prev) * 60 + parseInt(cur);
        });
};


export function uptimeTransform(datetime){
	let result = datetime.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2})(\d{2})/g);
}


export function dp_search(tree, path = []){
    let render_list = []
    console.log(tree);

    if(tree.open === 1){
      for(let j in tree.children){
        render_list.push({
          last_ddl_time: tree.children[j].last_ddl_time,
          num_rows: tree.children[j].num_rows,
          total_size: tree.children[j].total_size,
          name: j,
          path: [...path, j],
          flag: tree.children[j].open
        });
        const tmp = dp_search(tree.children[j], [...path, j]);
        render_list = [...render_list, ...tmp];
      }
    }
    return render_list;
}


// function 解决之前的另外一个需求


//