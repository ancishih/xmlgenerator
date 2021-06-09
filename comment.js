//載入模組,fs編輯文件模組,xmlbuilder編輯xml文件模組
const fs = require('fs');
const {create} = require('xmlbuilder2');

// init:初始值,max:上限,min:下限,floor:小數點以下幾位(無條件捨去)
function eValue(init,max,min,floor){
    const digit = Math.random()*(max-min)+min
    const number = Number(init) + Number(digit.toFixed(floor))
    return number
}
//init:初始值,rand:誤差,js時間以毫秒計算
function time(init,rand){
    //計算offset秒數
    const offset = Math.random()*rand*1000
    //interval:下次執行程式的間隔
    const interval = Number(init*60*1000)+Number(offset.toFixed())
    return interval
}

// 自動執行排程,時間間距由function time決定
setInterval((
    ()=>{
    //壓力設定target值:5,上限:0.2,下限:-0.2,小數第一位
    const pressure = eValue(5,0.2,-0.2,1)
    //溫度設定target值:50,上限:0.5,下限:-0.5,小數第一位
    const temperature = eValue(50,0.5,-0.5,1)
    
    //產生時間序,IIFE
    const timeStamp = function() {
        const time = new Date()
        //重新定義時間格式
        const year = time.getFullYear().toString()
        const month = (time.getMonth()+1).toString().length==1?"0"+(time.getMonth()+1):time.getMonth()+1
        const date = time.getDate().toString().length==1?"0"+time.getDate():time.getDate()
        const hour = time.getHours().toString().length==1?"0"+time.getHours().toString():time.getHours().toString()
        let minute = time.getMinutes().toString()
        minute = minute.length==1?"0"+minute:minute
        let seconds = time.getSeconds().toString()
        seconds = seconds.length==1?"0"+seconds:seconds
        let milliseconds = time.getMilliseconds().toString().slice(0,2)
        milliseconds = milliseconds.length==1?"00"+milliseconds:milliseconds
        const timeStamp = {
            year,
            month,
            date,
            hour,
            minute,
            seconds,
            milliseconds}
        //callback返回時間(Object,ES6表示式)
        return timeStamp
    }()
    
    //xml日期
    const fileDate = timeStamp.year+timeStamp.month+timeStamp.date+timeStamp.hour+timeStamp.minute+timeStamp.seconds
    //xml玻璃ID
    const glassId = timeStamp.month+timeStamp.date+timeStamp.hour+timeStamp.minute+timeStamp.seconds+timeStamp.milliseconds
    //xml機台名稱
    const eqpName = "OLXACLV01"
    //xml檔案名稱
    const fileName = fileDate+"_"+eqpName+"_"+glassId+".XML"

    const cldate = timeStamp.year+"-"+timeStamp.month+"-"+timeStamp.date
    const cltime = timeStamp.hour+":"+timeStamp.minute+":"+timeStamp.seconds

    const doc = create({version:'1.0'})
                    .ele("EDC")
                        .ele("glass_id").txt(glassId).up()
                        .ele("group_id").txt("GROUP").up()
                        .ele("lot_id").txt("LOT").up()
                        .ele("product_id").txt("PRODUCT").up()
                        .ele("pfcd").txt("PFCD").up()
                        .ele("eqp_id").txt(eqpName).up()
                        .ele("ec_code").txt("EC").up()
                        .ele("route_no").txt("ROUTE").up()
                        .ele("route_version").txt("VERSION").up()
                        .ele("owner").txt("PROD").up()
                        .ele("recipe_id").txt("RECIPE").up()
                        .ele("operation").txt("1099").up()
                        .ele("rtc_flag").txt("RTC").up()
                        .ele("pnp").txt("PNP").up()
                        .ele("chamber").txt("NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN").up()
                        .ele("cassette_id").txt("CSTID").up()
                        .ele("line_batch_id").txt("LINE").up()
                        .ele("split_id").txt("SPLIT").up()
                        .ele("cldate").txt(cldate).up()
                        .ele("cltime").txt(cltime).up()
                        .ele("mes_link_key").txt("MES_LINK").up()
                        .ele("rework_count").txt("REWORK").up()
                        .ele("operator").txt("OPERATOR").up()
                        .ele("reserve_field_1").txt("RES_1").up()
                        .ele("reserve_field_2").txt("RES_2").up()
                        .ele("compare_id").txt("COMP").up()
                        .ele("datas")
                            .ele("iary")
                                //上報溫度,測項名稱:Temperature,上報溫度temperature
                                .ele("item_name").txt("Temperature").up()
                                .ele("item_type").txt("X").up()
                                .ele("item_value").txt(temperature).up()
                            .up()
                            .ele("iary")
                                .ele("item_name").txt("Worktime").up()
                                .ele("item_type").txt("X").up()
                                .ele("item_value").txt("15").up()
                            .up()
                            .ele("iary")
                                //上報壓力,測項名稱:Pressure,上報壓力pressure
                                .ele("item_name").txt("Pressure").up()
                                .ele("item_type").txt("X").up()
                                .ele("item_value").txt(pressure).up()
                            .up()
                        .up()
                .doc()
                //呼叫method:end產生一個doc物件
                .end({prettyPrint:true})
    //在相對路徑src的資料夾底下產生xml文件，文件內容為doc
    fs.writeFile("./src/"+fileName,doc,
        //產生文件呼叫callback function。
        ()=>{console.log("影像辨識完成，產生xml檔案")}
    )
    }
),
//call function time 時間間隔
time(15,40)
)






