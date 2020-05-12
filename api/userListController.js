const Sequelize = require('sequelize');
// const database = require('../database');
// import axios from "axios"
const axios = require('axios');

const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'REALESTATE',
    password: 'fk051098',
    port: 5432,
  })


exports.listAllData = function(req, res){
    let date = "'DD/MM/YYYY'"
    let sql =  'SELECT  re."projectName" , re."buildingName" , st."staffName" , to_char(re."inspectionDate", '+date +') as inspectionDate , re."marketPriceClass", re."predictedPrice" FROM public."REALESTATE" re JOIN public."STAFF" st ON st."staffID" = re."staffID" ORDER BY re."inspectionDate" DESC'
    
    //callback
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listAllMap = function(req, res){
    let sql = 'SELECT dt."districtID", dt."districtName", dt."latCentreDistrict", dt."longCentreDistrict", re."marketPriceClass" FROM public."DISTRICT" dt JOIN public."REALESTATE" re ON dt."districtID" = re."districtID" ORDER BY dt."districtID" ASC;'
       
    //callback
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listSomeMap = function(req, res){
    let sql = 'SELECT dt."districtID", dt."districtName", dt."latCentreDistrict", dt."longCentreDistrict", re."marketPriceClass", re."projectID", re."inspectionDate", re."buildingAge", re."buildingCondition", re."buildingControlAct", re."roomType", re."roomPosition", re."roomView", re."materialDesign", re."units", re."areaRoom", tp."nearestBTS", tp."distanceFromBTS", tp."haveBTS", tp."haveMRT", tp."haveBRT" FROM public."DISTRICT" dt  JOIN public."REALESTATEDATA" re ON dt."districtID" = re."districtID" JOIN public."TRANSPORT" tp ON re."projectID" = tp."projectID" WHERE dt."districtID" = ' + req.params.districtID
    //callback
    console.log(req.params.districtID)
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listAllAccounts = function(req, res){
    let userid = req.params.userID
    let password = req.params.passWord
    let sql = 'SELECT ac."userID", ac."passWord", st."staffID", st."staffType" FROM public."ACCOUNT" ac JOIN public."STAFF" st ON st."staffID" = ac."staffID" WHERE ac."userID" = '+ userid +' AND ac."passWord" = ' + password
       
    //callback
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listSomeData = function(req, res){
    let date = "'DD/MM/YYYY'"
    let sql = 'SELECT re."projectID", re."roomCategory", re."projectName", re."latitude",  re."longtitude", re."buildingName", re."floor", st."staffName", to_char(re."inspectionDate", '+date +') as inspectionDate , sd."subdistrictID", sd."subdistrictName", dt."districtID", dt."districtName", dt."province", re."buildingFloor", re."buildingAge", re."buildingCondition",re."buildingControlAct", re."roomType", re."roomPosition", re."roomView",  re."materialDesign", re."units", re."areaRoom", re."camFee", re."pricebyGov", re."fireInsurance", re."maintananceCondition", re."marketPrice", re."marketPriceSQM", re."marketPriceClass", re."predictedPrice", fa."lobby", fa."lift", fa."swimmingPool", fa."fitness", fa."suana", fa."jacuzzi", fa."steam", fa."library", fa."garden", fa."kidplay", fa."parklot", fa."automateParklot", fa."golfCourse", fa."movieRoom", fa."shop", tp."nearestBTS", tp."distanceFromBTS", tp."haveBTS", tp."haveMRT", tp."haveBRT" FROM public."REALESTATE" re  JOIN public."STAFF" st ON st."staffID" = re."staffID"  JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" JOIN public."SUBDISTRICT" sd ON sd."subdistrictID" = re."subdistrictID" JOIN public."FACILITY" fa ON fa."projectID" = re."projectID" JOIN public."TRANSPORT" tp ON tp."projectID" = re."projectID" WHERE re."projectName" = ' + req.params.projectName
    //callback
    console.log(req.params.projectName)
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.updateAData = function(req, res){
    console.log(req.params.projectID)
    var datas = {}
    datas = req.body
    console.log("SSS",datas)
    
    let sql1 = 'UPDATE public."REALESTATE"  SET "districtID" = ($1), "subdistrictID" = ($2), "roomCategory" = ($3), "projectName" =  ($4), "latitude" = ($5), "longtitude" =  ($6), "buildingName" = ($7), "floor" = ($8), "buildingFloor" = ($9), "buildingAge" = ($10), "buildingCondition" = ($11), "buildingControlAct" = ($12), "roomType" = ($13), "roomPosition" = ($14), "roomView" = ($15), "materialDesign" = ($16), "units" = ($17), "areaRoom"= ($18), "camFee" = ($19), "pricebyGov" = ($20), "fireInsurance" = ($21), "maintananceCondition" = ($22), "marketPriceSQM" = ($23), "marketPrice" = ($24), "marketPriceClass" = ($25), "predictedPrice" = ($26) WHERE "projectID" = ($27);'
    let sql2 = 'UPDATE public."FACILITY" SET lobby = ($1),  "lift" = ($2), "swimmingPool" = ($3), "fitness" = ($4), "suana" = ($5), "jacuzzi" = ($6), "steam" = ($7), "library" = ($8), "kidplay" = ($9), "garden" = ($10), "parklot" = ($11), "automateParklot" = ($12), "golfCourse" = ($13), "movieRoom" = ($14), "shop" = ($15) WHERE "projectID" = ($16);'
    let sql3 = 'UPDATE public."TRANSPORT" SET "nearestBTS" = ($1), "distanceFromBTS" = ($2), "haveBTS" = ($3), "haveMRT" = ($4), "haveBRT" = ($5) WHERE "projectID" = ($6);'
      console.log(req.params.districtName)
    pool.query(sql1,[datas.districtID, datas.subdistrictID, datas.roomCategory, datas.projectName, datas.latitude, datas.longtitude, datas.buildingName, datas.floor, datas.buildingFloor, datas.buildingAge, datas.buildingCondition, datas.buildingControlAct, datas.roomType, datas.roomPosition, datas.roomView, datas.materialDesign, datas.units, datas.areaRoom, datas.camFee, datas.pricebyGov, datas.fireInsurance, datas.maintananceCondition, datas.marketPriceSQM, datas.marketPrice, datas.marketPriceClass, datas.predictedPrice, req.params.projectID],(error, results, fields)=>{
        if(error) {
            throw error
        }   
    })
    pool.query(sql2,[datas.lobby, datas.lift, datas.swimmingPool, datas.fitness, datas.suana, datas.jacuzzi, datas.steam, datas.library, datas.kidplay, datas.garden, datas.parklot, datas.automateParklot, datas.golfCourse, datas.movieRoom, datas.shop, req.params.projectID],(error, results, fields)=>{
        if(error) {
            throw error
        }   
    })
    pool.query(sql3,[datas.nearestBTS, datas.distanceFromBTS, datas.haveBTS, datas.haveMRT, datas.haveBRT, req.params.projectID],(error, results, fields)=>{
        if(error) {
            throw error
        }   
    })

    // promise
    pool
        .query(sql1)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashDist = function(req, res){
    let dist = 'select dt."districtID",dt."districtName",COUNT(re."marketPriceClass") as sumprice, sum(case when re."marketPriceClass" = 0 then 1 else 0 end) as eco, '+
    ' sum(case when re."marketPriceClass" = 1 then 1 else 0 end) as high, sum(case when re."marketPriceClass" = 2 then 1 else 0 end) as lux, sum(case when re."marketPriceClass" = 3 then 1 else 0 end) as ulti '+
    ' from public."REALESTATE" re  FULL OUTER JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" group by dt."districtID",dt."districtName" ORDER BY dt."districtID"'
    // console.log(req.params)
    pool.query(dist,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(dist)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashPos = function(req, res){
    let pos =  'SELECT sum(case when re."roomPosition" = 0 then 1 else 0 end) as corner, sum(case when re."roomPosition" = 1 then 1 else 0 end) as middle, sum(case when re."roomPosition" = 2 then 1 else 0 end) as edge FROM public."REALESTATE" re'

    pool.query(pos,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(pos)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashView = function(req, res){
    let vi = 'SELECT sum(case when re."roomView" = 0 then 1 else 0 end) as building, sum(case when re."roomView" = 1 then 1 else 0 end) as city,	sum(case when re."roomView" = 2 then 1 else 0 end) as park,	sum(case when re."roomView" = 3 then 1 else 0 end) as pools,	sum(case when re."roomView" = 4 then 1 else 0 end) as river    FROM public."REALESTATE" re'
    pool.query(vi,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(vi)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashPrice = function(req, res){
    let price = 'SELECT sum(case when re."marketPriceClass" = 0 then 1 else 0 end) as ec, sum(case when re."marketPriceClass" = 1 then 1 else 0 end) as hi, '+
    ' sum(case when re."marketPriceClass" = 2 then 1 else 0 end) as lu, sum(case when re."marketPriceClass" = 3 then 1 else 0 end) as ul FROM public."REALESTATE" re '
    pool.query(price,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(price)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashType = function(req, res){
    let typ = 'SELECT sum(case when re."roomType" = 1 then 1 else 0 end) as studio,	sum(case when re."roomType" = 2 then 1 else 0 end) as twobed,	sum(case when re."roomType" = 3 then 1 else 0 end) as threebed,	sum(case when re."roomType" = 4 or re."roomType" = 5 or re."roomType" = 7 then 1 else 0 end) as extra FROM public."REALESTATE" re'
    pool.query(typ,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(typ)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashMostPrice = function(req, res){
    let mp = 'select case when (GREATEST(sum(case when re."marketPriceClass" = 0 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) )   = sum(case when re."marketPriceClass" = 0 then 1 else 0 end) then '+"'"+'economy'+"'"+
        ' when (GREATEST(sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) ) = sum(case when re."marketPriceClass" = 1 then 1 else 0 end) then '+"'"+'high'+"'"+ 
        ' when (GREATEST(sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) ) = sum(case when re."marketPriceClass" = 2 then 1 else 0 end)then ' +"'"+'luxury'+"'"+
        ' when (GREATEST(sum(case when re."marketPriceClass" = 3 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) ) = sum(case when re."marketPriceClass" = 3 then 1 else 0 end) then ' +"'"+'ultimate'+"'"+ 'end as mprice'+
        ' from public."REALESTATE" re'
    pool.query(mp,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(mp)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}


exports.listSubDashSubdist = function(req, res){
    let district = req.params.districtName
    console.log(req.params.districtName)
    let subdist = 'select sd."subdistrictID",sd."subdistrictName", COUNT(re."marketPriceClass") as sumprice, sum(case when re."marketPriceClass" = 0 then 1 else 0 end) as eco, '+
    ' sum(case when re."marketPriceClass" = 1 then 1 else 0 end) as high, sum(case when re."marketPriceClass" = 2 then 1 else 0 end) as lux, sum(case when re."marketPriceClass" = 3 then 1 else 0 end) as ulti '+
    ' from public."REALESTATE" re FULL OUTER JOIN public."DISTRICT" dt  ON dt."districtID" = re."districtID" FULL OUTER JOIN public."SUBDISTRICT" sd ON sd."districtID" = dt."districtID" and sd."subdistrictID" = re."subdistrictID" WHERE dt."districtName" = ' +district+ 'group by sd."subdistrictID",sd."subdistrictName" ORDER BY sd."subdistrictID"'
    // console.log(req.params.districtName)
    pool.query(subdist,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(subdist)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashSubPos = function(req, res){
    let pos =  'SELECT sum(case when re."roomPosition" = 0 then 1 else 0 end) as corner, sum(case when re."roomPosition" = 1 then 1 else 0 end) as middle, sum(case when re."roomPosition" = 2 then 1 else 0 end) as edge FROM public."REALESTATE" re FULL OUTER JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" WHERE dt."districtName" = ' + req.params.districtName

    pool.query(pos,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(pos)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashSubView = function(req, res){
    let vi = 'SELECT sum(case when re."roomView" = 0 then 1 else 0 end) as building, sum(case when re."roomView" = 1 then 1 else 0 end) as city,	sum(case when re."roomView" = 2 then 1 else 0 end) as park,	sum(case when re."roomView" = 3 then 1 else 0 end) as pools,	sum(case when re."roomView" = 4 then 1 else 0 end) as river    FROM public."REALESTATE" re FULL OUTER JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" WHERE dt."districtName" = ' + req.params.districtName
    pool.query(vi,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(vi)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashSubPrice = function(req, res){
    let price = 'SELECT sum(case when re."marketPriceClass" = 0 then 1 else 0 end) as ec, sum(case when re."marketPriceClass" = 1 then 1 else 0 end) as hi,'+
    ' sum(case when re."marketPriceClass" = 2 then 1 else 0 end) as lu, sum(case when re."marketPriceClass" = 3 then 1 else 0 end) as ul FROM public."REALESTATE" re '+
    ' FULL OUTER JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" WHERE dt."districtName" = ' + req.params.districtName
    pool.query(price,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(price)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashSubType = function(req, res){
    let typ = 'SELECT sum(case when re."roomType" = 1 then 1 else 0 end) as studio,	sum(case when re."roomType" = 2 then 1 else 0 end) as twobed,	sum(case when re."roomType" = 3 then 1 else 0 end) as threebed,	sum(case when re."roomType" = 4 or re."roomType" = 5 or re."roomType" = 7 then 1 else 0 end) as extra FROM public."REALESTATE" re FULL OUTER JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" WHERE dt."districtName" = ' + req.params.districtName
    pool.query(typ,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(typ)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listDashSubMostPrice = function(req, res){
    let mp = 'select case when (GREATEST(sum(case when re."marketPriceClass" = 0 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) )   = sum(case when re."marketPriceClass" = 0 then 1 else 0 end) then '+"'"+'economy'+"'"+
        ' when (GREATEST(sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) ) = sum(case when re."marketPriceClass" = 1 then 1 else 0 end) then '+"'"+'high'+"'"+ 
        ' when (GREATEST(sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) ) = sum(case when re."marketPriceClass" = 2 then 1 else 0 end)then ' +"'"+'luxury'+"'"+
        ' when (GREATEST(sum(case when re."marketPriceClass" = 3 then 1 else 0 end) , sum(case when re."marketPriceClass" = 1 then 1 else 0 end) , sum(case when re."marketPriceClass" = 2 then 1 else 0 end) , sum(case when re."marketPriceClass" = 3 then 1 else 0 end)) ) = sum(case when re."marketPriceClass" = 3 then 1 else 0 end) then ' +"'"+'ultimate'+"'"+ 'end as mprice'+
        ' from public."REALESTATE" re FULL OUTER JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" WHERE dt."districtName" = ' + req.params.districtName
    pool.query(mp,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(mp)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.deleteAData = function(req, res){
    let projectName = req.params.projectName
    let sql = 'DELETE FROM public."REALESTATE" re WHERE re."projectName" = '+ projectName
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.listAllDataMobile = function(req, res){
    let date = "'DD/MM/YYYY'"
    let sql = 'SELECT re."projectID", re."staffID", re."projectName", re."buildingName", to_char(re."inspectionDate", '+date +') as inspectionDate FROM public."REALESTATE" re JOIN public."STAFF" st ON st."staffID" = re."staffID"' 
    + 'WHERE re."staffID" = ' + req.params.staffID + ' ORDER BY re."projectID" DESC;'
    //callback
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.CreateADataMobile = function(req, res){
    // var datas = {}
    // datas = req.body
    var datas = {projectID : 1188, staffID: 2, districtID: 16, subdistrictID: 59,
        roomCategory: 'ห้องชุดพักอาศัย', projectName: 'LC-63BF-0043.xlsx', latitude: 13.712209, longtitude: 100.584433, 
        buildingName: 'Aspire Rama 4', floor: 8, inspectionDate: '2563-01-13', buildingFloor: 32, 
        buildingAge: 7, buildingCondition: 2, buildingControlAct: 4, roomType: 1, roomPosition: 0, roomView: 0, 
        materialDesign: 2, units: 1437, areaRoom: 28.03, camFee: 35, 
         pricebyGov: 1657859,
         fireInsurance: 24850, 
        maintananceCondition: 1, lobby: 1, lift: 1, swimmingPool: 1, fitness: 1, suana: 0, jacuzzi: 0, 
        steam: 0, library: 0, kidplay: 0, garden: 0, parklot: 1, automateParklot: 0, golfCourse: 0, movieRoom: 0, 
        shop: 1, nearestBTS: 'BTS พระโขนง', distanceFromBTS: 990, haveBTS: 1 , haveMRT: 0, haveBRT: 0}
    console.log("SSS",datas)
    let sql1 = 'INSERT INTO public."REALESTATE"( "projectID", "staffID", "districtID", "subdistrictID", "roomCategory", "projectName", "latitude", "longtitude", "buildingName", "floor", "inspectionDate", "buildingFloor", "buildingAge", "buildingCondition", "buildingControlAct", "roomType", "roomPosition", "roomView", "materialDesign", units, "areaRoom", "camFee", "pricebyGov", "fireInsurance", "maintananceCondition")' 
        + 'VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15), ($16), ($17), ($18), ($19), ($20), ($21), ($22), ($23), ($24), ($25));'
    let sql2 = 'INSERT INTO public."FACILITY"( "lobby", "lift", "swimmingPool", "fitness", "suana", "jacuzzi", "steam", "library", "kidplay", "garden", "parklot", "automateParklot", "golfCourse", "movieRoom", "shop")'
        + 'VALUES (($1), ($2), ($3), ($4), ($5), ($6), ($7), ($8), ($9), ($10), ($11), ($12), ($13), ($14), ($15)) ;'
    let sql3 = 'INSERT INTO public."TRANSPORT"( "nearestBTS", "distanceFromBTS", "haveBTS", "haveMRT", "haveBRT")'
        + 'VALUES (($1), ($2), ($3), ($4), ($5));'

        //callback
    pool.query(sql1,[ datas.projectID,datas.staffID, datas.districtID, datas.subdistrictID, datas.roomCategory, datas.projectName, datas.latitude, datas.longtitude, datas.buildingName, datas.floor, datas.inspectionDate, datas.buildingFloor, datas.buildingAge, datas.buildingCondition, datas.buildingControlAct, datas.roomType, datas.roomPosition, datas.roomView, datas.materialDesign, datas.units, datas.areaRoom, datas.camFee, datas.pricebyGov, datas.fireInsurance, datas.maintananceCondition], (error, results, fields)=>{
        if(error) {
            throw error
        }   
        // res.json(results)
    })
    pool.query(sql2,[datas.projectID,datas.lobby, datas.lift, datas.swimmingPool, datas.fitness, datas.suana, datas.jacuzzi, datas.steam, datas.library, datas.kidplay, datas.garden, datas.parklot, datas.automateParklot, datas.golfCourse, datas.movieRoom, datas.shop],(error, results, fields)=>{
        if(error) {
            throw error
        }   
    })
    pool.query(sql3,[datas.projectID,datas.nearestBTS, datas.distanceFromBTS, datas.haveBTS, datas.haveMRT, datas.haveBRT],(error, results, fields)=>{
        if(error) {
            throw error
        }   
    })

    // promise
    pool
        .query(sql1)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}

exports.predictData = function(req, res){
    var datas = {}
    datas = req.body
    console.log("SSS",datas)

    let sql4 = 'UPDATE public."REALESTATE"  SET "predictedPrice" = ($1) WHERE "projectID" = ($2);'
    let b = 'select dt."latCentreDistrict", dt."longCentreDistrict" from public."DISTRICT" dt'
    
    pool.query(b,(error, bkk, fields)=>{
        if(error) {
            throw error
        }   
        res.json(bkk)
    })

    try {
        var resp = axios.post('http://localhost:5000/predict', { datas, bkk })      
                        .then(response => {
                            console.log(response.data.rows[0]);})

        var predictedPrice = resp.data.result
        console.log("1 ",predictedPrice)
    } catch (error) {
        console.error(error)
    }
    console.log("2 ",predictedPrice)
    pool.query(sql4,[predictedPrice, datas.projectID] , (error, results, fields)=>{
        if(error) {
            throw error
        }   
        // res.json(results)
    })

}

exports.listSomeDataMobile = function(req, res){
    let date = "'DD/MM/YYYY'"
    let sql = 'SELECT re."projectID", re."roomCategory", re."projectName", re."latitude",  re."longtitude", re."buildingName", re."floor", st."staffName", to_char(re."inspectionDate", '+date +') as inspectionDate , sd."subdistrictID", sd."subdistrictName", dt."districtID", dt."districtName", dt."province", re."buildingFloor", re."buildingAge", re."buildingCondition",re."buildingControlAct", re."roomType", re."roomPosition", re."roomView",  re."materialDesign", re."units", re."areaRoom", re."camFee", re."pricebyGov", re."fireInsurance", re."maintananceCondition", fa."lobby", fa."lift", fa."swimmingPool", fa."fitness", fa."suana", fa."jacuzzi", fa."steam", fa."library", fa."garden", fa."kidplay", fa."parklot", fa."automateParklot", fa."golfCourse", fa."movieRoom", fa."shop", tp."nearestBTS", tp."distanceFromBTS", tp."haveBTS", tp."haveMRT", tp."haveBRT" FROM public."REALESTATE" re  JOIN public."STAFF" st ON st."staffID" = re."staffID"  JOIN public."DISTRICT" dt ON dt."districtID" = re."districtID" JOIN public."SUBDISTRICT" sd ON sd."subdistrictID" = re."subdistrictID" JOIN public."FACILITY" fa ON fa."projectID" = re."projectID" JOIN public."TRANSPORT" tp ON tp."projectID" = re."projectID" WHERE re."projectName" = ' + req.params.projectName
    //callback
    console.log(req.params.projectName)
    pool.query(sql,(error, results, fields)=>{
        if(error) {
            throw error
        }   
        res.json(results)
    })

    // promise
    pool
        .query(sql)
        .then(res => console.log(res.rows[0]))
        .catch(e => console.error(e.stack))
}