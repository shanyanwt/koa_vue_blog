/*
 *金钱处理方法 
 * 
 * */

//万划分单位，自动分割
export let money = (s) => {
	if(/[^0-9\.]/.test(s)) return "--";
        s=s.replace(/^(\d*)$/,"$1.");
        s=(s+"00").replace(/(\d*\.\d\d)\d*/,"$1");
        s=s.replace(".",",");
        var re=/(\d)(\d{3},)/;
        while(re.test(s))
                s=s.replace(re,"$1,$2");
        s =s.replace(/,(\d\d)$/,".$1");
		return  s.replace(/^\./,"0.")
};