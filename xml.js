const fs = require('fs');
const {create} = require('xmlbuilder2');

function eValue(init,max,min,floor){
    const digit = Math.random()*(max-min)+min
    const number = Number(init) + Number(digit.toFixed(floor))
    return number
}

function time(init,rand){
    const offset = Math.random()*rand*1000
    const interval = Number(init*60*1000)+Number(offset.toFixed())
    return interval
}

setInterval((
    ()=>{
    const pressure = eValue(5,0.2,-0.2,1)
    const temperature = eValue(50,0.5,-0.5,1)
    
    const timeStamp = function() {
        const time = new Date()
        const year = time.getFullYear().toString()
        const month = (time.getMonth()+1).toString().length==1?"0"+(time.getMonth()+1):time.getMonth()+1
        const date = time.getDate().toString().length==1?"0"+time.getDate():time.getDate()
        const hour = time.getHours().toString().length==1?"0"+time.getHours().toString():time.getHours().toString()
        let minute = time.getMinutes().toString()
        minute = minute.length==1?"0"+minute:minute
        let seconds = time.getSeconds().toString()
        seconds = seconds.length==1?"0"+seconds:seconds
        let milliseconds = time.getMilliseconds().toString()
        milliseconds = milliseconds.length==1?"00"+milliseconds:milliseconds
        const timeStamp = {
            year,
            month,
            date,
            hour,
            minute,
            seconds,
            milliseconds
        }
        return timeStamp
    }()
    const fileDate = timeStamp.year+timeStamp.month+timeStamp.date+timeStamp.hour+timeStamp.minute+timeStamp.seconds
    const glassId = timeStamp.month+timeStamp.date+timeStamp.hour+timeStamp.minute+timeStamp.seconds+timeStamp.milliseconds
    const eqpName = "OLXACLV01"
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
                                .ele("item_name").txt("Pressure").up()
                                .ele("item_type").txt("X").up()
                                .ele("item_value").txt(pressure).up()
                            .up()
                        .up()
                .doc().end({prettyPrint:true})
     fs.writeFile("./src/"+fileName,doc,
        ()=>{console.log("xml file created!")}
    )
    }
),time(15,40))






